export default [
  {
    title: 'Template',
    icon: { icon: 'tabler-template' },

    children: [
      {
        title: 'List Templates',
        icon: { icon: 'tabler-list-details' },
        to: 'template-list',
        action: 'read',
        subject: 'Auth',
      },
      {
        title: 'Create Template',
        icon: { icon: 'tabler-cloud-computing' },
        to: 'template-add',
        action: 'create',
        subject: 'Auth',
      },
    ],
  },
]
