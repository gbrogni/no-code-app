export interface DataTableColumn<TData> {
  id: keyof TData;
  headerText: string;
  isLink?: boolean;
  cell?: (row: TData) => React.ReactNode;
}

export function createColumn<TData>(id: keyof TData, headerText: string, isLink?: boolean): DataTableColumn<TData> {
  return { id, headerText, isLink };
}

export function createCustomCellColumn<TData>(
  id: keyof TData,
  headerText: string,
  cell: (row: TData) => React.ReactNode
): DataTableColumn<TData> {
  return { id, headerText, cell };
}