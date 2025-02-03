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
    async getEmpBossName(empCode:string): Promise<Employee[]> { //8
        const query = "SELECT e1.EMP_NAME AS emp_name," +
            "e2.EMP_NAME AS boss_name " +
            "FROM EMPLOYEE e1 " +
            "LEFT JOIN EMPLOYEE e2 ON e1.EMP_MGT = e2.EMP_CODE " +
            "WHERE e1.EMP_RCODE = $1 is Null;";

        const client = await setConnection();

        try {
            const result = await client.query(query, [empCode]);
            return result.rows;
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return [];
        } finally {
            await client.end();
        }
    }
    async getEmpNameSal(): Promise<Employee[]> { // 9. 연예관계자에 대해 이름과 급여를 출력하고, 급여의 내림차순으로 정렬하시오.
        // 단, 동일 급여일 때는 이름의 오름차순으로 정렬하시오.
        const query = "SELECT emp_name,emp_sal FROM employee ORDER BY emp_sal desc,emp_name asc ";
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
    async getEmpGrpSal(): Promise<Employee[]> { // 10. 모든 연예관계자를 직급별로 그룹화하고,
        // 평균 급여액이 5000 이상인 직급에 대해 연예 관계자의 직급, 평균 급여액, 최소 급여액, 최대 급여액을 검색하시오
        const query = "SELECT e.EMP_RCODE AS empRcode," +
            " r.EMP_RNAME AS empRname," +
            " AVG(e.EMP_SAL) AS avgSalary," +
            " MIN(e.EMP_SAL) AS minSalary," +
            " MAX(e.EMP_SAL) AS maxSalary" +
            " FROM EMPLOYEE e" +
            " JOIN EMP_ROLE r ON e.EMP_RCODE = r.EMP_RCODE" +
            " GROUP BY e.EMP_RCODE, r.EMP_RNAME" +
            " HAVING AVG(e.EMP_SAL) >= 5000;";

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
    async getEmpNameAvg(): Promise<Employee[]> { //11
        const query = "SELECT EMP_NAME, EMP_SAL FROM EMPLOYEE e WHERE EMP_SAL > (SELECT AVG(EMP_SAL) FROM EMPLOYEE);";

        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return [];
        } finally {
            await client.end();
        }    }
    async updateDrmDate(): Promise<string> { //12
        const query = "UPDATE drama SET drm_opdate = $1 WHERE drm_opdate is NULL ";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const result = await client.query(query, ["2013-05-01"]);
            await client.query("COMMIT");
            return `Updated rows: ${result.rowCount}`;
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
    async updateEmpSal(): Promise<Employee[]> { // 13
        const query = "UPDATE EMPLOYEE e " +
            "SET EMP_SAL = EMP_SAL * 1.2, " +
            "EMP_RCODE = (SELECT EMP_RCODE FROM EMP_ROLE WHERE EMP_RNAME = '실장') " +
            "WHERE e.EMP_NAME = '김수현' " +
            "AND e.EMP_RCODE = (SELECT EMP_RCODE FROM EMP_ROLE WHERE EMP_RNAME = '대리') " +
            "RETURNING *";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const result = await client.query(query);
            await client.query("COMMIT");
            return result.rows;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("SQLException:", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async insertEmp(employee:Employee): Promise<Employee[]> { //14. 우리 회사에 한 명의 임원이 등록되었습니다. 코드는 E903, 이름은 손진현, 관리자는 E901, 급여는 4000입니다. 알맞게 등록하시오.
        const query = "INSERT INTO employee(emp_code,emp_name,emp_mgt,emp_sal) " +
            "values ('E903','손진현','E901',4000) " +
            "RETURNING *";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const result = await client.query(query);
            await client.query("COMMIT");
            return result.rows;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("SQLException: ", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }
    // async deleteEmp(empName:string): Promise<number> { //15. 연예관계자인 손진현님이 퇴직했습니다. 연예관계자 목록에서 제거하시오.
    //     const query = "DELETE FROM employee WHERE emp_name='$1'";
    //     const client = await setConnection();
    //
    //     try {
    //         await client.query("BEGIN");
    //         const result = await client.query(query, [empName]);
    //         await client.query("COMMIT");
    //         return result.rowCount;
    //     }
    //     catch (error) {
    //         await client.query("ROLLBACK");
    //         console.error("SQLException:", (error as Error).message);
    //         throw error;
    //     }
    //     finally {
    //         await client.end();
    //     }

  //  }

}