export const postSchema = {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      validation: (Rule: any) => Rule.required().max(200)
    },
    {
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alt'
            }
          ]
        }
      ]
    }
  ]
}