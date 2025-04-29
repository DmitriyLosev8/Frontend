const getIdFromTitle = (title) => {
    return title
        .toLowerCase()
        .replace(' ', '-')
}

export default getIdFromTitle