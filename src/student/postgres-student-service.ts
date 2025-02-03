import type {StudentService} from "@student/student-service.ts";
import {Student} from "@student/student.ts";
import {setConnection} from "@common/postgres-access.ts";

export class PostgresStudentService implements StudentService {
    updateStudent(student: Student): Promise<number> {
        throw new Error("Method not implemented.");
    }
    updateStudentMulti(students: Student[]): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteStudentByNo(no: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteStudentByNoMulti(students: Student[]): Promise<number> {
        throw new Error("Method not implemented.");
    }


    async getStudents(): Promise<Student[]> {
        const query = "SELECT * FROM student";
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            await client.end();
            return [];
        } finally {
        }
    }

    async getStudentByNo(no: string): Promise<Student> {
        const query = "SELECT * FROM student";
        const client = await setConnection();

        try {
            const result = await client.query(query, [no]);
            return result.rows[0];
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return new Student();
        } finally {
            await client.end();
        }
    }

    async getStudentByName(name: string): Promise<Student> {
        const query = "SELECT * FROM student WHERE name = $1";
        const client = await setConnection();

        try {
            const result = await client.query(query, [name]);
            return result.rows[0];
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return new Student();
        } finally {
            await client.end();
        }
    }


    async getStudentByBirthday(birthday: string): Promise<Student> {
        const query = "SELECT * FROM student WHERE birthday = $1";
        const client = await setConnection();

        try {
            const result = await client.query(query, [birthday]);
            return result.rows[0];
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return new Student();
        } finally {
            await client.end();
        }
    }

    async insertStudent(student: Student): Promise<number> {
        const query = "INSERT INTO student(no,name,birthday) values ($1,$2,$3)";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const result = await client.query(query, [
                student.no,
                student.name,
                student.birthday,
            ]);
            await client.query("COMMIT");
            return result.rowCount || 0;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("SQLException: ", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async insertStudentMulti(students: Student[]): Promise<number> {
        const query = "INSERT INTO student(no,name,birthday) values ($1,$2,$3)";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            let result;
            let resultCount = 0;

            for (const student of students) {
                if (!student.no && !student.name) break;


                result = await client.query(query, [
                    student.no,
                    student.name,
                    student.birthday,
                ]);
                resultCount += result.rowCount || 0;
                await client.query("COMMIT");
            }
            return resultCount || 0;

        } catch (error) {
            await client.query("ROLLBACK");
            console.error("SQLException: ", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async insertStudentMultiBatch(students: Student[]): Promise<number> {
        const query = "INSERT INTO student(no, name, birthday) VALUES ($1, $2, $3)";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const promises = students.map(student => {
                if (!student.no && !student.name) return;
                return client.query(query, [
                    student.no,
                    student.name,
                    student.birthday,
                ]);
            });
            const results = await Promise.all(promises);
            await client.query("COMMIT");
            return results.reduce((sum, result) => sum + ((result?.rowCount) || 0), 0);
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
}
