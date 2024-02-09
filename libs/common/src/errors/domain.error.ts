import { ValidationError } from "class-validator";

export class DomainError extends Error {
    code: number;

    constructor (errors: ValidationError[], message?: string) {
        const _errors: string[] = [];
        
        errors.length && errors.forEach(err => {
            err?.constraints && Object
            .entries(err.constraints)
            .forEach(v => {
                _errors.push(v[1]);
            }
            )});
            
        super(`${_errors.join(';')}`);
        
        this.name = DomainError.name;
    }
}