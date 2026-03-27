const contactAPI = {}
const url = 'https://playground.4geeks.com/contact'

contactAPI.getUser = async () => {
    try{
        const resp = await fetch(url + '/agendas')
        if (!resp.ok) throw new Error('Algo salió mal')
            const data = await resp.json()
        console.log(data)
    } catch (error) {
        return error
    }
}

contactAPI.getAgenda = async (slug) => {
    try{
        const resp = await fetch(url + '/agendas/'+ slug)
        if (!resp.ok) throw new Error('Algo salió mal')
            const data = await resp.json()
        console.log(data)
    } catch (error) {
        return error
    }
}
 
export default contactAPI;