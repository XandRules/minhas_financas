import { Register } from './pages/account/register/models/Register';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { RequestInfo } from "angular-in-memory-web-api/interfaces";

import { Category } from "./pages/categories/shared/category.model";
import { Entry } from "./pages/entries/shared/entry.model";

export class InMemoryDatabase implements InMemoryDbService {
  createDb(){
    const categories: Category[] = [
      { id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa' },
      { id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios' },
      { id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc' },
      { id: 4, name: 'Salário', description: 'Recebimento de Salário'},
      { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer'},
      { id: 6, name: 'Outros', description: 'Outras despesas'},

    ];

    const entries: Entry[] = [
      { id: 1, name: 'Gás de Cozinha', categoryId: categories[0].id, category: categories[0], paid: true, date: "14/03/2021", amount: "70,80", type: "expense", description: "Qualquer descrição para essa despesa" } as Entry,
      { id: 2, name: 'Mercado', categoryId: categories[1].id, category: categories[1], paid: false, date: "14/03/2021", amount: "15,00", type: "expense" } as Entry,
      { id: 3, name: 'Salário na Empresa X', categoryId: categories[3].id, category: categories[3], paid: true, date: "15/03/2021", amount: "4405,49", type: "revenue" } as Entry,
      { id: 4, name: 'Netflix', categoryId: categories[2].id, category: categories[2], paid: true, date: "16/03/2021", amount: "15,00", type: "expense" } as Entry,
      { id: 5, name: 'Mercado', categoryId: categories[1].id, category: categories[1], paid: true, date: "17/03/2021", amount: "30,00", type: "expense" } as Entry,
      { id: 6, name: 'Video Game', categoryId: categories[2].id, category: categories[2], paid: false, date: "17/03/2021", amount: "15,00", type: "expense" } as Entry,
      { id: 11, name: 'Uber', categoryId: categories[1].id, category: categories[1], paid: true, date: "17/03/2021", amount: "30,00", type: "expense" } as Entry,
      { id: 12, name: 'Aluguel', categoryId: categories[2].id, category: categories[2], paid: false, date: "23/03/2021", amount: "15,00", type: "expense" } as Entry,
      { id: 13, name: 'Gás de Cozinha', categoryId: categories[1].id, category: categories[1], paid: false, date: "25/03/2021", amount: "30,00", type: "expense" } as Entry,
      { id: 14, name: 'Pagamento Pelo Projeto XYZ', categoryId: categories[4].id, category: categories[4], paid: true, date: "25/03/2021", amount: "2980,00", type: "revenue" } as Entry,
      { id: 19, name: 'Netflix', categoryId: categories[2].id, category: categories[2], paid: false, date: "07/04/2021", amount: "15,00", type: "expense" } as Entry,
      { id: 21, name: 'Video Game', categoryId: categories[1].id, category: categories[1], paid: true, date: "17/04/2021", amount: "30,00", type: "expense" } as Entry,
      { id: 22, name: 'Cinema', categoryId: categories[2].id, category: categories[2], paid: true, date: "18/04/2021", amount: "15,00", type: "expense" } as Entry,
      { id: 23, name: 'Gasolina', categoryId: categories[1].id, category: categories[1], paid: false, date: "21/04/2021", amount: "130,00", type: "expense" } as Entry,
      { id: 44, name: 'Uber', categoryId: categories[2].id, category: categories[2], paid: true, date: "28/04/2021", amount: "15,00", type: "expense" } as Entry,
      { id: 55, name: 'Cinema', categoryId: categories[1].id, category: categories[1], paid: false, date: "28/04/2021", amount: "30,00", type: "expense" }  as Entry
    ];

    const customers: Register[] = [
      { id: 1, name: 'Alexandre',lastname: 'Ribeiro',  password: '1234', email: 'alexandre@email.com' } as Register,
      // add as many data you need
    ];

    return { categories, entries, customers }
  }

  post(reqInfo: RequestInfo) {

      // if client pinged api/authentication
      //  then call authenticate (defined below)
      if (reqInfo.collectionName === 'authentication')
          return this.authenticate(reqInfo)

      //  otherwise default response of In-memory DB
      return undefined
  }

  private authenticate(reqInfo: RequestInfo) {
    // return an Observable response
      return reqInfo.utils.createResponse$(() => {
          console.log('HTTP POST api/authentication override')

          const { headers, url, req } = reqInfo

          // if request username and passord are correct
          //  return response with a JSONWebToken
          const { email, password } = req['body']
          if (email === 'alexandre@email.com' && password === '1234')
              return {
                status: 200,
                headers,
                url,
                body: {
                  user:  { id: 1, name: 'Alexandre', lastname: 'Ribeiro', email: 'alexandre@email.com' },
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                }
              }

          //  otherwise return response with status code 401 (unauthorized)
          return {
            status: 401,
            headers,
            url,
            body: { }
          }
      })
  }


}
