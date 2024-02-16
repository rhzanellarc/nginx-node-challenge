const express = require('express')

const app = express()
const port = 3000
let connection = null

app.get('/', async (req,res) => {
    getConnection()
    createTable()
    saveNames()
    let response = '<h1>Full Cycle</h1>'
    response += getNameList(await getNames())
    res.send(response)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

const getConnection = () => {
    if (!connection) {
        const mysql = require('mysql')

        const config = {
            host: 'db',
            user: 'root',
            password: 'root',
            database:'nodedb'
        };
        connection = mysql.createConnection(config)
    }
    return connection
}

const createTable = () => {
    // getConnection().query('drop table people')
    let sql = `CREATE TABLE if not exists people(name varchar(255));`
    getConnection().query(sql)
}

const save = async (name) => {
    const sql = `INSERT INTO people(name) values('${name}')`
    getConnection().query(sql)
}

const saveNames = async () => {
    await save(randomName())
}

const getNames = () => {
    const sql = "select * from people"

    return new Promise((resolve, reject) => {
        getConnection().query(sql, async (err, result) => {
            if (err) return reject(err); 
            return resolve(result);
        })
        
    })
}

const getNameList = (names) => {
    let list = '';

    names.forEach(item => list += `<li>${item.name}</li>`);

    return `<ul>${list}</u>`
}

const randomName = () => {
    const names = ["Miguel", "Arthur", "Gael", "Théo", "Heitor", "Ravi", "Davi", "Bernardo", "Noah", "Gabriel", "Samuel", "Pedro", "Anthony", "Isaac", "Benício", "Benjamin", "Matheus", "Lucas", "Joaquim", "Nicolas", "Lucca", "Lorenzo", "Henrique", "João Miguel", "Rafael", "Henry", "Murilo", "Levi", "Guilherme", "Vicente", "Felipe", "Bryan", "Matteo", "Bento", "João Pedro", "Pietro", "Leonardo", "Daniel", "Gustavo", "Pedro Henrique", "João Lucas", "Emanuel", "João", "Caleb", "Davi Lucca", "Antônio", "Eduardo", "Enrico", "Caio", "José", "Enzo Gabriel", "Augusto", "Mathias", "Vitor", "Enzo", "Cauã", "Francisco", "Rael", "João Guilherme", "Thomas", "Yuri", "Yan", "Anthony Gabriel", "Oliver", "Otávio", "João Gabriel", "Nathan", "Davi Lucas", "Vinícius", "Theodoro", "Valentim", "Ryan", "Luiz Miguel", "Arthur Miguel", "João Vitor", "Léonovo", "Ravi Lucca", "Apollo", "Thiago", "Tomás", "Martin", "José Miguel", "Erick", "Liam", "Josué", "Luan", "Asafe", "Raul", "José Pedro", "Dominic", "Kauê", "Kalel", "Luiz Henrique", "Dom", "Davi Miguel", "Estevão", "Breno", "Davi Luiz", "Thales", "Israel"]
    const lastNames = ["Abreu", "Adães", "Adorno", "Aguiar", "Albuquerque", "Alcântara", "Aleluia", "Alencar", "Almeida", "Altamirano", "Alvarenga", "Álvares", "Alves", "Alvim", "Amaral", "Amigo", "Amor", "Amorim", "Anchieta", "Andrada", "Andrade", "André", "Anes", "Anjos", "Antônio", "Antunes", "Anunciação", "Apolinário", "Aragão", "Araújo", "Arruda", "Ascensão", "Assis", "Auth", "Azeredo", "Azevedo", "Cabral", "Caldas", "Camacho", "Camargo", "Caminha", "Camões", "Cândido", "Cardoso", "Carmo", "Carnaval", "Carneiro", "Carvalhal", "Carvalho", "Carvalhosa", "Castilho", "Castro", "Chaves", "Coelho", "Coimbra", "Conceição", "Constante", "Cordeiro", "Costa", "Costa", "Cotrim", "Coutinho", "Couto", "Cruz", "Cunha", "Curado", "Macedo", "Machado", "Madureira", "Maduro", "Mairinque", "Malafaia", "Malta", "Martins", "Mascarenhas", "Maurício", "Medeiros", "Médici", "Mendes", "Mendonça", "Menino", "Mesquita", "Messias", "Miranda", "Monteiro", "Montenegro", "Moraes", "Morais", "Morato", "Moreira"]
    return `${names[randomNumber(names.length - 1)]} ${lastNames[randomNumber(lastNames.length - 1)]}`
}

const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
}
