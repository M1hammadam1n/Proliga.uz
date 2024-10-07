'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState, useReducer } from 'react'
import TransferTableHead from './Head'
import TransferTableBody from './Body'
import { useSelector } from 'react-redux'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { LANGUAGE } from 'app/utils/languages.util'
const columnHelper = createColumnHelper()

function JournalTable() {
  const { t } = useTranslation()
  const { activities } = useSelector((state) => state.userActivity)
  const { lang } = useSelector((state) => state.systemLanguage)
  const [data, setData] = useState([])

  useEffect(() => {
    if (activities) {
      const newData = []
      activities.map((item) => {
        const date = new Date(item?.created_at)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const year = date.getFullYear()

        newData.push({
          ...item,
          minutes,
          created_at: `${day}.${month}.${year} | ${hours}:${minutes === 0 ? '00' : minutes < 10 ? '0' + minutes : minutes}`,
        })
      })
      setData(newData)
    }
  }, [activities])

  const columns = [
    columnHelper.accessor('created_at', {
      id: 'date',
      header: t('Sana'),
      accessorFn: (row) => row.created_at,
    }),
    columnHelper.accessor('name', {
      accessorKey: 'name',
      cell: (info) => info.getValue(),
      header: t('Oyinchi ismi'),
      id: 'name',
      header: t('Xabar'),
      accessorFn: (row) => (lang === LANGUAGE.uz ? row.name_uz : row.name_ru),
    }),
  ]

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <table className="h-full w-full text-sm">
      <TransferTableHead table={table} />
      <TransferTableBody table={table} flexRender={flexRender} />
    </table>
  )
}

export default JournalTable
