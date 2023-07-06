module.exports = class Data1688638757762 {
    name = 'Data1688638757762'

    async up(db) {
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "spender" text NOT NULL, "receiver" text NOT NULL, "amount" numeric NOT NULL, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "approval" ("id" character varying NOT NULL, "owner" text NOT NULL, "spender" text NOT NULL, "value" numeric NOT NULL, CONSTRAINT "PK_97bfd1cd9dff3c1302229da6b5c" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP TABLE "approval"`)
    }
}
