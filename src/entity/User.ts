import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";

@Entity()
@ObjectType()
export class User {

    @Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string;

    @Field(() => String)
	@Column()
	firstName: string;

    @Field(() => String)
	@Column()
	lastName: string;
}
