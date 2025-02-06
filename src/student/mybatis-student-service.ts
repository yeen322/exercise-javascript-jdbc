import {Student} from "./student";
import * as path from "node:path";
import mybatisMapper from "mybatis-mapper";
import type {StudentService} from "@student/student-service.ts";
import {setConnection} from "@common/postgres-access.ts";
import {formatDateToYYYYMMDD} from "@common/utils.ts";

const studentMapper = path.resolve("C:\\Developments\\exercise\\javascript\\hello-dbconn\\src\\student\\mapper\\student-mapper.xml");
mybatisMapper.createMapper([studentMapper]);
const format: mybatisMapper.Format = {
    language: "sql",
    indent: "",
}

export class MybatisStudentService implements StudentService{
    async getStudents(): Promise<Student[]> {
        const client = await setConnection();

        console.log("1");
        try {
            console.log("2");
            const query = mybatisMapper.getStatement("student","getStudents",{},format);
            console.log("3");
            const result = await client.query(query);
            console.log("4");
            return result.rows;
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return [];
        } finally {
            await client.end();
        }
    }
    async getStudentByNo(no: string): Promise<Student> {
        const client = await setConnection();

        try {
            const query = mybatisMapper.getStatement("student","getStudentByNo",{no},format);
            const result = await client.query(query);
            return result.rows[0];
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return new Student();
        } finally {
            await client.end();
        }
    }
    async getStudentByName(name: string): Promise<Student> {
        const client = await setConnection();

        try {
            const query = mybatisMapper.getStatement("student","getStudentByName",{name},format);
            const result = await client.query(query);
            return result.rows[0];
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return new Student();
        } finally {
            await client.end();
        }
    }
    async getStudentByBirthday(birthday: string): Promise<Student> {
        const client = await setConnection();

        try {
            const query = mybatisMapper.getStatement("student","getStudentByBirthday",{birthday},format);
            const result = await client.query(query);
            return result.rows[0];
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return new Student();
        } finally {
            await client.end();
        }
    }
    async insertStudent(student: Student): Promise<number> {
        const client = await setConnection();

        const params= {
            no: student.no,
            name: student.name,
            birthday: student.birthday
            ? formatDateToYYYYMMDD(student.birthday)
            : null,
        };

        try {
            await client.query("BEGIN");
            const query = mybatisMapper.getStatement("student","insertStudent",params,format);
            const result = await client.query(query);
            await client.query("COMMIT")
            return result.rowCount || 0;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query ", (error as Error).stack);
            throw error;
        } finally {
            await client.end();
        }
    }
    async insertStudentMulti(students: Student[]): Promise<number> {
        const client = await setConnection();
        console.log('insertStudentMulti', students);
        try {
            await client.query("BEGIN");

            const promises = students.map(student => {
                const params= {
                    no: student.no,
                    name: student.name,
                    birthday: student.birthday
                        ? formatDateToYYYYMMDD(student.birthday)
                        : null,
                };
                const query = mybatisMapper.getStatement("student","insertStudent",params,format);
                return client.query(query);
            });

            const results = await Promise.all(promises);
            await client.query("COMMIT");
            return results.reduce((sum, result ) => sum + (result.rowCount || 0), 0);
        } catch (error) {
            await client.query("ROLLBACK");
            console.error(students);
            console.error("Error executing query ", (error as Error).stack);
            throw error;
        } finally {
            await client.end();
        }
    }

    async updateStudent(student: Student): Promise<number> {
        console.log('jhi');
        const client = await setConnection();

        const params = {
            no: student.no,
            birthday: student.birthday
                ? formatDateToYYYYMMDD(student.birthday)
                : null,
        };

        try {
            await client.query("BEGIN");
            const query = mybatisMapper.getStatement("student", "updateStudent", params, format);
            const result = await client.query(query);
            await client.query("COMMIT");
            return result.rowCount || 0;
        }
        catch (error) {
            await client.query("ROLLBACK");
            console.error("SQLException:", (error as Error).message);
            throw error;
        }
        finally {
            await client.end();
        }
    }
    async updateStudentMulti(students: Student[]): Promise<number> {
        const client = await setConnection();

        try {
            await client.query("BEGIN");

            const promises = students.map(student => {
                const params= {
                    no: student.no,
                    birthday: student.birthday
                        ? formatDateToYYYYMMDD(student.birthday)
                        : null,
                };
                const query = mybatisMapper.getStatement("student","updateStudent",params,format);
                return client.query(query);
            });

            const results = await Promise.all(promises);
            await client.query("COMMIT");
            return results.reduce((sum, result ) => sum + (result.rowCount || 0), 0);
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query ", (error as Error).stack);
            throw error;
        } finally {
            await client.end();
        }
    }

    async deleteStudentByNo(no: string): Promise<number> {
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const query = mybatisMapper.getStatement("student","deleteStudentByNo",{no},format);
            const result = await client.query(query);
            await client.query("COMMIT")
            return result.rowCount || 0;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query ", (error as Error).stack);
            throw error;
        } finally {
            await client.end();
        }
    }
    async deleteStudentByNoMulti(students: Student[]): Promise<number> {
        const client = await setConnection();

        try {
            await client.query("BEGIN");

            const promises = students.map(student => {
                const params= {
                    no: student.no !== undefined ? student.no :null,
                };
                const query = mybatisMapper.getStatement("student","deleteStudentByNo",params,format);
                return client.query(query);
            });

            const results = await Promise.all(promises);
            await client.query("COMMIT");
            return results.reduce((sum, result ) => sum + (result.rowCount || 0), 0);
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query ", (error as Error).stack);
            throw error;
        } finally {
            await client.end();
        }
    }

}