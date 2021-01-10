import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name:"names" })
export class Name {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable : false})
    name!: string;

    @Column({nullable : false})
    amount!: number;

}