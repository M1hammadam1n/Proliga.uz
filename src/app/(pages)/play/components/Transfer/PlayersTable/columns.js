import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor('name', {
    accessorKey: 'name',
    cell: (info) => info.getValue(),
    header: 'Name',
    meta: {
      filterVariant: 'name',
    },
  }),
  columnHelper.accessor('price', {
    accessorKey: 'price',
    header: 'Price',
    cell: (info) => info.renderValue(),
    meta: {
      filterVariant: 'price',
    },
  }),
  columnHelper.accessor('club.name', {
    accessorKey: 'club.name',
    header: 'Club',
    meta: {
      filterVariant: 'club',
    },
  }),
  columnHelper.accessor((row) => row.position, {
    accessorFn: (row) => row.position,
    id: 'position',
    cell: (info) => <i>{info.getValue()}</i>,
    header: 'Position',
    meta: {
      filterVariant: 'position',
    },
  }),
]
export default columns
