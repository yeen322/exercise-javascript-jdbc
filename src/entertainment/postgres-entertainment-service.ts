import type {EntertainmentService} from "@/entertainment/entertainment-service.ts";
import type { Department, Drama, Employee,Movie,Music,PartMusic,PartMovie,PartDrama,RelDepartment,EmpRole } from "@/entertainment/entertainment.ts";
import {setConnection} from "@common/postgres-access.ts";


export class PostgresEntertainmentService implements EntertainmentService {

    async getDepInfo(): Promise<Department[]> { // 1.HNU Entertainment의 부서 코드, 이름, 위치를 검색하시오
        const query = "SELECT * FROM department";
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return [];
        } finally {
            await client.end();
        }
    }
    async getEmpInfo(): Promise<Employee[]> { // 2. HNU Entertainment의 연예관계자 코드, 이름, 관리자, 급여를 검색하시오
        const query = "SELECT emp_Code,emp_Name,emp_Mgt,emp_Sal FROM employee";
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return [];
        } finally {
            await client.end();
        }
    }
    async getDrmInfo(): Promise<Drama[]> { // 3. HNU Entertainment에서 제작한 드라마의 코드와 이름을 검색하시오.
        const query = "SELECT drm_Name,drm_Code FROM drama";
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return [];
        } finally {
            await client.end();
        }
    }
    async getDrmPrdKbcSbc(): Promise<Drama[]> { // 4. 드라마 방영사가 KBC이거나 SBC인 드라마를 검색하시오
        const query = "SELECT * FROM drama WHERE drm_brd IN ('KBC', 'SBC')";
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return [];
        } finally {
            await client.end();
        }
    }
    async getDrmPrd(): Promise<Drama[]> { // 5. 드라마 제작사를 검색하시오. 단, 중복된 값이 있으면 제거하시오.
        const query = "SELECT distinct drm_prd FROM drama ";
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return [];
        } finally {
            await client.end();
        }

    }
    async getSalSumAvg(): Promise<number[]> { //6. 연예관계자들의 급여의 총합과 평균 급여액을 계산하시오.
        const query = "SELECT sum(emp_sal),avg(emp_sal) FROM employee ";
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return [];
        } finally {
            await client.end();
        }
    }
    async getNullDrmName(): Promise<Drama[]> { // 7
        const query = "SELECT drm_name FROM drama WHERE drm_opdate IS NULL ";
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return [];
        } finally {
            await client.end();
        }

    }
    async getEmpBossName(empRcode: string): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    async getEmpNameSal(empName: string, empSal: number): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    async getEmpGrpSal(): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    async getEmpNameAvg(): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    async updateDrmDate(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async updateEmpSal(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async insertEmp(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async deleteEmp(): Promise<string> {
        throw new Error("Method not implemented.");
    }





}