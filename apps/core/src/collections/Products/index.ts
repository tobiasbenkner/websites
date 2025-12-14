import { superAdminOrTenantAdminAccess } from '@/access/superAdminOrTenantAdmin'
import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
    create: superAdminOrTenantAdminAccess,
    update: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 2000,
      },
      schedulePublish: true,
      validate: false,
    },
    maxPerDoc: 50,
  },
  admin: {
    defaultColumns: ['name', 'category', 'price', 'available', 'sortOrder'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Beschreibung',
      localized: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Preis (€)',
      min: 0,
    },
    {
      name: 'category',
      type: 'relationship',
      required: true,
      label: 'Kategorie',
      relationTo: 'productCategories',
    },
    {
      name: 'allergens',
      type: 'select',
      hasMany: true,
      label: 'Allergene',
      options: [
        {
          label: { es: 'Apio', de: 'Sellerie', en: 'Celery' },
          value: 'celery',
        },
        {
          label: { es: 'Crustáceos', de: 'Krebstiere', en: 'Crustaceans' },
          value: 'crustaceans',
        },
        {
          label: { es: 'Lácteos', de: 'Milchprodukte', en: 'Dairy' },
          value: 'dairy',
        },
        {
          label: { es: 'Huevo', de: 'Ei', en: 'Egg' },
          value: 'egg',
        },
        {
          label: { es: 'Pescado', de: 'Fisch', en: 'Fish' },
          value: 'fish',
        },
        {
          label: { es: 'Gluten', de: 'Gluten', en: 'Gluten' },
          value: 'gluten',
        },
        {
          label: { es: 'Legumbres', de: 'Hülsenfrüchte', en: 'Legumes' },
          value: 'legumes',
        },
        {
          label: { es: 'Moluscos', de: 'Weichtiere', en: 'Mollusks' },
          value: 'mollusks',
        },
        {
          label: { es: 'Mostaza', de: 'Senf', en: 'Mustard' },
          value: 'mustard',
        },
        {
          label: { es: 'Frutos secos', de: 'Nüsse', en: 'Nuts' },
          value: 'nuts',
        },
        {
          label: { es: 'Cacahuete', de: 'Erdnuss', en: 'Peanut' },
          value: 'peanut',
        },
        {
          label: { es: 'Sésamo', de: 'Sesam', en: 'Sesame' },
          value: 'sesame',
        },
        {
          label: { es: 'Soja', de: 'Soja', en: 'Soy' },
          value: 'soy',
        },
        {
          label: { es: 'Sulfitos', de: 'Sulfite', en: 'Sulfites' },
          value: 'sulfites',
        },
      ],
    },
    {
      name: 'note',
      label: 'Note',
      type: 'text',
      localized: true,
      hasMany: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild',
    },
    {
      name: 'available',
      type: 'checkbox',
      label: 'Verfügbar',
      defaultValue: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Reihenfolge',
      admin: {
        step: 1,
      },
    },
  ],
}
