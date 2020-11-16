module.exports =  repository => ({
    id: repository.id,
    name: repository.name,
    description: repository.description,
    public: repository.public,
    slug: repository.slug,
})