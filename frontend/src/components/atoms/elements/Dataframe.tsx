import { DataGrid } from '@mui/x-data-grid';

import { useFetch } from 'hooks/useFetch';

import { type IDataframeElement } from 'client-types/';

interface Props {
  element: IDataframeElement;
}

const DataframeElement = ({ element }: Props) => {
  const { data } = useFetch(element.url || null);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { index, columns, data: rowData } = JSON.parse(data);

  const gridColumns = columns.map((col: string) => ({
    field: col,
    minWidth: 150
  }));

  const gridRows = rowData.map((row: (string | number)[], idx: number) => {
    const rowObj: any = { id: index[idx] };
    columns.forEach((col: string, colIdx: number) => {
      rowObj[col] = row[colIdx];
    });
    return rowObj;
  });

  return (
    <DataGrid
      sx={{
        bgcolor: 'background.paper'
      }}
      rows={gridRows}
      columns={gridColumns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10
          }
        }
      }}
      pageSizeOptions={[10, 50, 100]}
    />
  );
};

export { DataframeElement };
