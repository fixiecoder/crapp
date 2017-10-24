const inspectorPaths = (type) => ({
  info: {
    paramPath: '/designer/:main/info',
    toPath: `/designer/${type}/info`,
  },
  delete: {
    paramPath: '/designer/:main/delete',
    toPath: `/designer/${type}/info`,
  }
});

export const paths = {
  path: '/',
  designer: {
    toPath: '/designer',
    canvas: {
      paramPath: '/designer/canvas',
      toPath: '/designer/canvas',
      ...inspectorPaths('canvas')
    },
    datagrid: {
      toPath: '/designer/datagrid',
      ...inspectorPaths('datagrid')
    },
  }
};
