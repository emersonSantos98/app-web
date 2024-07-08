export default [
  {
    title: 'Produto',
    icon: { icon: 'tabler-lock' },
    children: [
      {
        title: 'Produtos',
        to: 'product',
        action: 'read',
        subject: 'Auth',
      },
      {
        title: 'Atualizar Instock',
        to: 'permission-roles-permissions',
        action: 'read',
        subject: 'Auth',
      },
    ],
  },
]
