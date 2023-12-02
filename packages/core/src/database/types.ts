import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
  user: UserTable
}

export interface UserTable {
  // Columns that are generated by the database should be marked
  // using the `Generated` type. This way they are automatically
  // made optional in inserts and updates.
  id: Generated<number>

  name: string
  email: string
  avatar_url: string
  provider_id: number

  // If the column is nullable in the database, make its type nullable.
  // Don't use optional properties. Optionality is always determined
  // automatically by Kysely.
  // last_name: string | null

  // You can specify a different type for each operation (select, insert and
  // update) using the `ColumnType<SelectType, InsertType, UpdateType>`
  // wrapper. Here we define a column `created_at` that is selected as
  // a `Date`, can optionally be provided as a `string` in inserts and
  // can never be updated:
  created_at: ColumnType<Date, string | undefined, never>
}

// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>

// export interface PetTable {
//   id: Generated<number>
//   name: string
//   owner_id: number
//   species: 'dog' | 'cat'
// }
//
// export type Pet = Selectable<PetTable>
// export type NewPet = Insertable<PetTable>
// export type PetUpdate = Updateable<PetTable>