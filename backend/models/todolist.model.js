module.exports = mongoose => {
    const Todolist = mongoose.model('todolist', mongoose.Schema(
        {
            todo: String,
            isDone: Boolean
        },
        { timestamps: true })
    )
    return Todolist
}