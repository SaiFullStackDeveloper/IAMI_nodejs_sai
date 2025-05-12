import { GETQuoteToken, SubmitIssueQuote } from "@/common/api/quote"

export const SubmitIssueQuoteForm = async (block: {
    CarrierReferenceNumber: string,
    ProposalNo: string,
    DuePremium: string,
    BusinessName: string,
}) => {

    try {
        const [access] = await GETQuoteToken()
        const responseValue = await SubmitIssueQuote(access?.access_token!, {
            Amount: String(block.DuePremium),
            ProposalNo: block.ProposalNo,
            RefNo: block.CarrierReferenceNumber,
            Name: block.BusinessName,
        })
        console.log(responseValue)
        return responseValue

    } catch (error) {
        return [null, (error as Error).message]
    }

}
