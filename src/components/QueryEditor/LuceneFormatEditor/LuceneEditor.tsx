export function getFilterLucene(field: string, operator: string, value: string, prevQuery: string): string {
  let fieldQuery = '';
  switch (operator) {
    case 'is':
      fieldQuery = `${field}:"${value}"`;
    case 'is not':
      fieldQuery = `NOT ${field}:"${value}"`;
    case 'exists':
      fieldQuery = `${field}:*`;
    case 'exists':
      fieldQuery = `NOT ${field}:*`;
    default:
      fieldQuery = `${field}:"${value}"`;
  }
  if (prevQuery === null || prevQuery.trim().length === 0) {
    return fieldQuery;
  } else {
    return `${prevQuery} AND ${fieldQuery}`;
  }
}
