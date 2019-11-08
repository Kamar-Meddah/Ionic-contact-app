export class Contact {

    private id: string;
    private name: string;
    private phone: string;


    public getId(): string {
        return this.id;
    }

    public setId(value: string): Contact {
        this.id = value;
        return this;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string): Contact {
        this.name = value;
        return this;
    }

    public getPhone(): string {
        return this.phone;
    }

    public setPhone(value: string): Contact {
        this.phone = value;
        return this;
    }
}
