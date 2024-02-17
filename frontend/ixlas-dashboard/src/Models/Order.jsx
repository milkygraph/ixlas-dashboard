export default class Order {
    constructor(order_id, issued_date, name, surname, phone_number, language_from, language_to, number_of_pages, notary_id, total_payment, down_payment, remaining, translator_id, expenses, status_id, details) {
        this.id = order_id;
        this.issued_date = issued_date;
        this.name = name;
        this.surname = surname;
        this.phone_number = phone_number;
        this.language_from = language_from;
        this.language_to = language_to;
        this.number_of_pages = number_of_pages;
        this.notary_id = notary_id;
        this.total_payment = total_payment;
        this.down_payment = down_payment;
        this.remaining = remaining
        this.translator_id = translator_id;
        this.expenses = expenses;
        this.status_id = status_id;
        this.details = details;
    }
}
