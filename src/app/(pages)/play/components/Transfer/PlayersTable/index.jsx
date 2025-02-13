'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import TransferTablePagination from './Pagination'
import TransferTableHead from './Head'
import TransferTableBody from './Body'
import TransferTableFilters from './Filters'
import TeamOverview from '../TeamOverview'
import { useSelector } from 'react-redux'
import { selectPlayers } from 'app/lib/features/players/players.selector'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { getCorrentPlayerPosition } from 'app/utils/getCorrectPlayerPosition.utils'

const columnHelper = createColumnHelper()

function PlayersTable() {
  const [sorting, setSorting] = useState([
    {
      id: 'price',
      desc: true,
    },
  ])
  const { t } = useTranslation()
  const { lang } = useSelector((state) => state.systemLanguage)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 9,
  })
  const { isLoading } = useSelector((state) => state.players)
  const selectedPlayers = useSelector(selectPlayers)
  useEffect(() => {
    if (selectedPlayers?.length > 0) {
      setData(selectedPlayers)
    }
  }, [selectedPlayers])

  const columns = [
    columnHelper.accessor('name', {
      accessorKey: 'name',
      cell: (info) => info.getValue(),
      header: t('Ism'),
      meta: {
        filterVariant: 'name',
      },
    }),
    columnHelper.accessor('club.name', {
      accessorKey: 'club.name',
      header: t('Klub'),
      meta: {
        filterVariant: 'club',
      },
    }),
    columnHelper.accessor('price', {
      accessorKey: 'price',
      header: t('Narx'),
      cell: (info) => info.renderValue(),
      filterFn: (row, id, filterValues) => {
        const price = row.getValue(id)
        const { min, max } = filterValues

        if (min !== undefined && price < min) {
          return false
        }
        if (max !== undefined && price > max) {
          return false
        }
        return true
      },
      meta: {
        filterVariant: 'price',
      },
    }),
    columnHelper.accessor((row) => row.point, {
      accessorFn: (row) => row.point,
      id: 'point',
      cell: (info) => info.getValue(),
      header: t('Ochko'),
    }),
    columnHelper.accessor('position', {
      accessorFn: (row) => getCorrentPlayerPosition(row.position, lang),
      id: 'position',
      header: t('Poz'),
      meta: {
        filterVariant: 'position',
      },
    }),
  ]

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
  })

  return (
    <div className="fade-in-fast min-h-auto h-min w-auto border-collapse overflow-x-auto rounded-xl border border-primary border-opacity-50 bg-black px-2 py-4 text-neutral-200 shadow-md shadow-neutral-600 transition-all hover:border-opacity-100 xs:px-3 sm:px-4 md:text-sm lg:w-1/2">
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="loader" />
        </div>
      ) : (
        <>
          <TeamOverview />
          <div className="grid w-full grid-cols-4 grid-rows-2 gap-x-0.5 gap-y-3 text-sm xs:text-xs sm:grid-rows-1 md:gap-1 md:text-sm lg:text-base xl:gap-y-2">
            {table
              .getHeaderGroups()
              .map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TransferTableFilters
                    key={header.id}
                    column={header.column}
                  />
                ))
              )}
          </div>
          <table className="w-full min-w-80 table-auto text-sm">
            <TransferTableHead table={table} />
            <TransferTableBody table={table} flexRender={flexRender} />
          </table>
          <TransferTablePagination table={table} />
        </>
      )}
    </div>
  )
}

export default PlayersTable
