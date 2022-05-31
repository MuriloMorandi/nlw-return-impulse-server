import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repositories";

interface SubmitfeedbackUseCaseRequest{
    type: string
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase{
    
    constructor(
        private feedbackrepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) { }
    
    async execute(request:SubmitfeedbackUseCaseRequest ) {
        const { type, comment, screenshot } = request;
        
        await this.feedbackrepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: "novo feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type} </p>`,
                `<p>Comentario: ${comment} </p>`,
                `</div>`
            ].join("\n")
        })
    }
}