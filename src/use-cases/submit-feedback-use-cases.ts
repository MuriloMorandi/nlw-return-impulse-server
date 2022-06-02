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

        if (!type) {
            throw new Error('Type is required')
        }

        if (!comment) {
            throw new Error('Comment is required')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
            throw new Error("Invalid screenshot format.")
        }
        

        await this.feedbackrepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type} </p>`,
                `<p>Comentario: ${comment} </p>`,
                `<img style="height: 300px;" alt="screenshot" src=${screenshot}  />`,
                `</div>`
            ].join("\n")
        })
    }
}