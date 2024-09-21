import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper()
export const columns = [
  columnHelper.accessor('name', {
    accessorKey: 'name',
    cell: (info) => info.getValue(),
    header: 'Ism',
    meta: {
      filterVariant: 'name',
    },
  }),
  columnHelper.accessor('club.name', {
    accessorKey: 'club.name',
    header: 'Klub',
    meta: {
      filterVariant: 'club',
    },
  }),
  columnHelper.accessor('price', {
    accessorKey: 'price',
    header: 'Narx',
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
    header: 'Ochko',
  }),
  columnHelper.accessor((row) => row.position, {
    accessorFn: (row) => row.position,
    id: 'position',
    cell: (info) => <i>{info.getValue()}</i>,
    header: 'Poz',
    meta: {
      filterVariant: 'position',
    },
  }),
]
