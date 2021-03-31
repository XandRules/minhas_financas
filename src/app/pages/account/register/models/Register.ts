import { BaseResourceModel } from "src/app/shared/models/base-resource.model";


export class Register{
  constructor(
    public id?:number,
    public name?: string,
    public lastname?: string,
    public email?: string,
    public password?: string,
  ){

  }
}
