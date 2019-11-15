export class Contact {

    public id: string;
    public name: string;
    public phone: string;

    constructor(name?: string, phone?: string) {
        this.name = name;
        this.phone = phone;
        this.id = crypto.getRandomValues(new Uint8Array(10)).join('');
    }


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
