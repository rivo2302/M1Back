db.updateUser({
    user: process.env.DB_USER,
    pwd: process.env.DB_PASSWORD,
    roles: [
        {
            role: "readWrite",
            db: process.env.DB_NAME
        } ,
        {
            role: "dbAdmin",
            db: process.env.DB_NAME
        },
        {
            role: "userAdmin",
            db: "admin"
        },
        {
            role: "clusterAdmin",
            db: "admin"
        }
        ,{
            role: "readWriteAnyDatabase",
            db: "admin"
        }

    ]
});