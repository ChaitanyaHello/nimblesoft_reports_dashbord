import { PDFDocument, rgb, StandardFonts} from "pdf-lib";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class Revocable_living_TrustAgreementPDF {

    constructor(){}
    private replacedValues: string[] = [];
    
    async livingtrustrevocablegeneratePDF(clientData: any) {
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
        const titleFontSize = 15;
        const textFontSize = 11;

        const Tittle = clientData?.Trust_Title?.trim() 
        ? { text: clientData.Trust_Title, font: boldFont }
        : { text: "____________________________________________", font: font };
      
      const name = clientData?.firstName?.trim() && clientData?.lastName?.trim()
        ? { text: `${clientData.firstName} ${clientData.lastName}`, font: boldFont }
        : { text: "_________________________", font: font};
      
      const Trustee_1 = clientData?.Trustee_1?.trim()
        ? { text: clientData.Trustee_1, font: boldFont }
        : { text: "_________________________", font: font };
      
      const Trustee_2 = clientData?.Trustee_2?.trim()
        ? { text: clientData.Trustee_2, font: boldFont }
        : { text: "_________________________", font: font};


        this.replacedValues = [
            name.text,
            Trustee_1.text,
            Trustee_2.text,
            Tittle.text
        ].filter(value =>
            value && value.trim() !== '' && value !== '_________________________' && value !== '____________________________________________'
        );

      const textsigm = { text: Tittle.text, font: Tittle.font };
        
        // Sections split across pages
        const pagesContent = [
            [
                `${Tittle.text}`,
                `${name.text} and ${name.text}, both of Frisco, Denton County, Texas, as Settlors, hereby enter into this TRUST AGREEMENT with ${name.text} and ${name.text}, as Co-Trustees (collectively referred to herein as “Trustee”), on this the ___________ day of ___________________, 2025. `,
                "WITNESSETH:",
                "ARTICLE 1.",
                "Recitals/Definitions",
                `1.10 This Trust will be known as the \"______________________________________\", a revocable trust which will become irrevocable upon the death of the Surviving Settlor.`,
                "1.2 This Trust is a Grantor Trust during the joint lives of the Settlors under Code §§ 671-678...",
                "1.3 The property subject to this Trust and any other Trust created hereby shall be held, administered, and distributed in accordance with the terms of this Trust Agreement.",
                `1.4 All references in this Trust Agreement to \"the Settlors\" or \"the Settlor\" are to ${name.text} and ${name.text}.`,
                "1.5 All references in this Trust Agreement to the \"Deceased Settlor\" are to the first of the Settlors to die.",
                "1.6 All references in this Trust Agreement to \"the Surviving Settlor\" are to the Settlor who survives the death of the Deceased Settlor.",
                "1.7 The term \"the Settlors’ children\" as used herein shall refer only to ______________ and ____________________.",
                "1.8 An individual’s issue will include only the individual’s children, grandchildren, and other persons of a lower generation of whom the individual is the lineal ancestor, including persons born subsequent hereto, and those who are adopted prior to attaining eighteen (18) years of age by the individual or a member of the individual’s issue.",
                "1.9 A disposition in this Trust Agreement to the issue of a person in per stirpital parts, or to the issue of a person, per stirpes, shall be deemed to require a division into a sufficient number of equal shares to make one (1) such share for each child of such person living at the time such disposition becomes effective and one (1) share for each then deceased child of such person having one (1) or more issue then living, regardless of whether any child of such person is then living, with the same principle applied in any required further division of a share at a more remote generation."
            ],
            [
                "1.10 All references to the \"Code\" are to the Internal Revenue Code of 1986, as amended, any subsequent similar federal provisions, and will include similar provisions of any state law",
                "1.11 All references to \"education\" include any education at a private elementary, middle or high school,  any boarding, college preparatory or military school, or any undergraduate school as well as education beyond the undergraduate level and means any school, college, or university (including any graduate school) as defined in Section 170(b)(1)(A)(ii) of the Code as an “organization which normally maintains regular faculty and curriculum and normally has a regularly enrolled body of pupils or students in attendance at the place where its educational activities are regularly carried on.” Educational expenses include but are not limited to payments for tuition, room and board, books, clothing, supplies, and travel to and from school. ",
                "1.12 All references to a \"Qualified Trustee\" mean only a Trustee or successor Trustee as initially named herein, a trust company or bank having trust powers, one (1) or more of either Settlor’s children or Settlor’s children’s issue who is thirty-five (35) years of age or older at the date of appointment or any individual or corporation appointed as successor Trustee hereunder pursuant to Article 8. Any designation of a corporate Trustee will include its corporate successors.At no time may an individual considered “special needs” or receiving means-tested government benefits be considered a Qualified Trustee.",
                "1.13 An individual will be considered \"disabled\" or under a \"disability\" when a legal guardian is appointed for the individual or the Trustee has written confirmation of two (2) licensed and practicing physicians stating that such individual is unable to make informed decisions with respect to his or her financial resources to such an extent that the individual lacks the capacity to effectively manage his or her real or personal property by those actions necessary to obtain, administer, manage, or dispose of such property",
                "1.14 All references to an \"Independent Trustee\" shall only be to a person that does not otherwise benefit under this Trust Agreement and is an individual or corporate fiduciary who is not a related or subordinate party within the meaning of § 672(c) of the Code with respect to any beneficiary of this Trust held under this Trust Agreement.",
                "1.15 The term \"distributable net income\" will be defined in the same manner as defined under Section 643(a) of the Code. Any payment of distributable net income provided for herein will be made first from net accounting income, next from net realized short-term capital gains, and then from net realized long-term capital gains.",
                "1.16 Any community property transferred to this Trust, including the property’s income and the proceeds from the property’s sale or exchange, will retain its character as community property during the Settlors’ lives, to the same extent as if it had not been transferred to this Trust."
            ],
            [
                "1.17 Any separate property transferred to this Trust, including the property’s income and the proceeds from the property’s sale or exchange, will become community property and be treated as such pursuant to paragraph 1.16 unless otherwise specified prior to transfer on a schedule attached hereto and signed by the transferring Settlor. If separate property is contributed to this Trust and is identified on a schedule attached hereto, it shall retain its separate property character during the Settlors’ lives, to the same extent as if it had not been transferred to this Trust. Each of the Settlors has the right to withdraw any or all of such Settlor’s separate property at any time. Life insurance proceeds payable to this Trust on an insurance policy that is the separate property of either Settlor will retain its character as separate property",
                "1.18 If the Settlors have entered into a marital agreement concerning ownership of each Settlor’s or the Settlors’ property, the terms of such agreement will control the characterization of such property transferred to this Trust.",
                "1.19 All references in this Trust Agreement to a \"Charitable Organization\" are to any qualifying charitable organization as defined by Sections 501(c)(3), 170(b)(1)(A), 170(c), 2055(a), and 2522(a) of the Code, including both publicly and privately established charitable organizations.",
                "1.20 The Settlors hereby transfer and deliver to the Trustee the sum of Five Dollars ($5.00). The Trustee is authorized to accept and administer additional gifts or transfers of property from the Settlors, or from other persons or entities, whether by lifetime gift, will, codicil, beneficiary designation, or by the proceeds of life insurance. Any such gift or other transfer will be administered by the Trustee under the terms of this Trust Agreement. These assets are to be held, with any future additions, IN TRUST, and the Trustee is directed to invest and reinvest the same and to dispose of the income and principal in accordance with the terms of this Trust Agreement.",
                "ARTICLE 2.",
                "Disposition During the Settlors’ Lifetimes",
                "2.1 During the time period either or both Settlors are living, this Trust shall be and is revocable at the option of either of the Settlors. Likewise, the Settlors, acting jointly during both of their lifetimes and while both have capacity or individually during the Surviving Settlor’s lifetime, may at any time alter, amend, or modify any of the terms and provisions of this Trust; PROVIDED, HOWEVER, that, during the lifetime of both Settlors if a Settlor is disabled pursuant to paragraph 1.13 of this Trust, a Settlor seeking to alter, amend, or modify this Trust shall obtain the consent of an Independent Special Trustee appointed under the provisions of Article 11; FURTHER, PROVIDED, HOWEVER, that the duties, powers and liabilities of the Trustee hereunder shall not be substantially changed without the Trustee’s written consent. If the Trust is revoked, the assets, if any, owned by the Trust shall be delivered by the Trustee to the Settlors or the Surviving Settlor, as the case may be, or in accordance with the Settlors’ or the Surviving Settlor’s written direction as delivered to the Trustee",
                "2.2 No amendment changing the compensation, powers, or duties of the Trustee will be effective unless approved and accepted in writing by the Trustee. However, the Trustee may be removed in accordance with other provisions hereunder. The powers retained by the Settlors or the Surviving Settlor, as the case may be, to amend or revoke this Trust Agreement are personal to the Settlors or the Surviving Settlor, but may be exercised by either of the Settlors or the Surviving Settlor’s attorney-in-fact, if such document grants the authority, or court-appointed legal representative."
            ],
            [
                "2.3 The Settlors, acting jointly during their joint lifetime or individually during the Surviving Settlor’s lifetime, may remove community property from the Trust. Either Settlor, during their individual lifetime, may unilaterally remove their separate property from the Trust. Community property removed from the Trust will retain its character as community property. Furthermore, the Settlors, acting jointly during their joint lifetime or individually during the Surviving Settlor’s lifetime, may direct the Trustee to distribute part or all of the net income of the trust property as the Settlors or the Surviving Settlor dictate. In the absence of direction by the Settlors or the Surviving Settlor, the Trustee may distribute the net income and principal from the community property to the Settlors or the Surviving Settlor at the Trustee’s discretion and may distribute the net income and principal from such Settlor’s separate property to such Settlor at the Trustee’s discretion. The Trustee may also distribute income and principal from either Settlor’s separate property to the other Settlor as needed for health, support or maintenance needs.",
                "2.5 The remaining distributable net income, if any, will be accumulated and added to the principal of the Trust on an annual basis. ",
                "2.6 The Trustee may accept or acquire ownership of residential property or an interest therein. Carrying costs, including but not limited to, maintenance, repairs, insurance and taxes, shall be paid from the Trust income, if possible, otherwise from the principal of the Trust.",
                "2.7 A Settlor may, by written notice to the Trustee, exercise an inter vivos general power of appointment over any property held by the Trust that qualifies for exemption as such Settlor's residence homestead",
                "2.8 A Settlor may use and occupy any property that qualifies for exemption as such Settlor's residence homestead as such Settlor's principal residence at no cost to either Settlor until the date of such Settlor's death or the date of revocation or termination of the Trust, whichever is earlier.",
                "ARTICLE 3.",
                "Administration of the Trust Upon Death of a Settlor",
                "3.1 Upon the death of a Settlor (referred to in this Article as “such Settlor”), assets payable to the Trustee from any source will be added to the assets then in the Trust. The Trustee will accept assets delivered by the Executor of an estate as all the assets the Trustee is entitled to receive at the values placed thereon by the Executor without having to examine the books and records of the Executor. Collectively such assets will be known as the “gross trust assets of the Deceased Settlor.” ",
                "3.2 If the residue of such Settlor’s estate is not sufficient to pay administration costs, non-residuary devises and bequests, and the transfer, estate, and inheritance taxes (including ",
            ],
            [
                "interest and penalties) due from it, the Trustee will pay directly, or to the Executor, from such Settlor’s separate property and/or such Settlor’s share of community property such amounts as the Executor certifies as necessary to pay the balance of such items incurred as a result of such Settlor’s death. If any of the gross trust assets are pledged as collateral for the payment of any loan of such Settlor, the Trustee will pay such loan, including interest, when demanded, from the pledged assets if the residue of such Settlor’s estate is insufficient to pay said loan, but will charge the amount of such payment against the recipient of such assets if the assets are specifically designated for a recipient. In addition, the Trustee may (but is not required to) pay from the gross trust assets such Settlor’s legal debts if the residue of such Settlor’s estate is insufficient to pay them. All such payments, except of interest, will be charged generally against that portion of the Trust principal that is included in such Settlor’s estate for federal estate tax purposes, and any interest so paid will be charged generally against the income thereof. Notwithstanding the foregoing, no life insurance proceeds or qualified retirement plan assets (including an Individual Retirement Account, Keogh Plan, and tax-sheltered annuity) payable to this Trust will be paid to such Settlor’s Executor on account of this paragraph.",
                "3.3  All transfer, estate, and inheritance taxes (including interest and penalties) payable by reason of such Settlor’s death on account of the inclusion in such Settlor’s estate of property, whether passing under this Trust Agreement or otherwise, from which payment is not otherwise directed or which is not otherwise exonerated, will be apportioned against and paid by the recipients of such property to which such tax is attributable in the proportion that the value of the property received by a recipient bears to the total value of the property received by all such recipients (using for this purpose the values as finally determined in the federal estate tax proceeding relating to such Settlor’s estate). Taxes imposed by Chapter 13, or Sections 2032A(c) or 2057(f)(2), of the Code will be apportioned against and paid by the recipient of the property to which such tax is attributable. If such Settlor’s Executor elects to defer estate and inheritance taxes on certain property under Section 6166 of the Code, such taxes will be apportioned against and paid by the recipient of such property. The recipient of property the gift of which caused gift tax to be paid will be treated as having received not only the gift property but also the amount of any gift tax included in such Settlor’s estate by Section 2035(b) of the Code for purposes of apportionment. The benefit of a deduction, credit, reduction, or exemption under any provision of the Code (for instance, due to the marital or charitable deductions, the previously taxed property credit, the reduction in value under Sections 2032A or 2057, a state or foreign death tax credit, a credit for gift taxes paid, the applicable credit amount (the unified credit), or otherwise) will inure to the recipient of the property to which such benefit is attributable. The Trustee may pay any taxes from the trust fund prior to recovering the attributable tax from the recipient of the property, or may subtract the attributable tax from such recipient’s share, as the Trustee deems advisable.",
                "3.4  Written statements by such Settlor’s Executor of such sums due and payable by such Settlor’s estate will be sufficient evidence of their amount and propriety for the protection of the Trustee, and the Trustee will be under no duty to see to the application of any such payments.",
                "3.5  The remaining balance of such Settlor’s separate property, as referenced in paragraph 1.17 and share of community property, shall be held and administered, subject to compliance with Article 4, as provided in Article 2. ",
            ],
            [
                "3.6 Upon the death of the Surviving Settlor, all remaining assets of the Trust shall be administered, subject to compliance with Article 4, as provided in Article 5.",
                "ARTICLE 4.",
                "Disposition of Tangible Personal Property",
                "4.1 Either of the Settlors may dispose of such Settlor’s separate tangible personal property and household effects (“Personal Property”), according to the terms of a separate handwritten memorandum. If a Settlor has created such a memorandum prior to the execution of this Trust and has attached it to this Trust Agreement, such Settlor hereby incorporates by reference said memorandum as if fully set forth in this Trust Agreement. If, for any reason, it is determined that the Trustee is not legally bound to make the distributions set forth in such memorandum (which the Settlors each understand and accept as a possibility), such Settlor nevertheless requests that the directions contained in same be honored to the extent allowed by law. Any Personal Property directed to be distributed to a beneficiary who is not living at the time of such Settlor’s death and for whom no effective alternate provision has been made shall pass as otherwise provided herein as if such memorandum did not exist and without right of representation among the beneficiary’s issue. If no such memorandum is found or identified within thirty (30) days after the death of such Settlor, or if any such memorandum is deemed unenforceable or is not respected, then it shall be conclusively presumed and deemed that there is no such memorandum. Notwithstanding anything herein to the contrary, it is not the Settlors’ intent to attempt to direct any disposition of Personal Property that may be part of such Settlor’s probate estate and already bequeathed pursuant to such Settlor’s Last Will and Testament.",
                "4.2 In default of such memorandum or to the extent the Trustee does not completely or effectively dispose of all of such Settlor’s Personal Property pursuant to such memorandum, such Settlor’s remaining Personal Property shall pass to the Surviving Settlor, or if none, to the Settlors’ then living children, to be divided among them by the Trustee according to their personal preferences. If the Settlors’ children cannot reach a total and unequivocal agreement between themselves as to the distribution of such Personal Property, then the Trustee shall sell such remaining Personal Property and distribute the proceeds pursuant to the terms and provisions of Article 5. If none of the Settlors’ children survive the Surviving Settlor, then the Trustee shall sell such remaining Personal Property and distribute the proceeds pursuant to the terms and provisions of Article 5. ",
                "4.3 Notwithstanding anything herein, if any child of the Settlors entitled to a share of the Settlors’ Personal Property shall be a minor at the time of the Surviving Settlor’s death, the Settlors authorize the Trustee, in the Trustee’s discretion, to choose items of Personal Property for such minor child and to retain such share for the benefit of such minor child during his or her minority, or to deliver all or any part of such share in kind to the guardian, parent, or the person with whom such minor child may reside, or, if the Trustee shall deem it advisable, to sell such Personal Property and to add the proceeds to such child’s share of the Settlors’ estate.",
                "ARTICLE 5.",
                "Administration of Trust Upon Death of the Surviving Settlor",
                "Upon the last of the Settlors’ deaths, the remaining Trust Estate will be divided into equal shares, one (1) share for each of the Settlors’ then living children and one (1) share for each "
            ],
            [
                "deceased child of the Settlors who is survived by then living issue. Each share set aside for one (1) of the Settlors’ living children will be distributed to such child outright and free of trust. Each share set aside for a deceased child of the Settlors who is survived by issue shall be distributed outright and free of trust to such issue, per stirpes. ",
                "ARTICLE 6.",
                "In Event of Death of All Beneficiaries",
                "6.1 In the event that all beneficiaries identified in the Articles above (1) do not survive the Surviving Settlor or no longer exist as of the Surviving Settlor’s date of death or (2) are not living or not in existence at the time a distribution of assets or the final distribution of assets subject to this Trust Agreement should be made, and distribution thereof is not otherwise provided for under other provisions of this Trust Agreement, the Trustee shall divide any and all remaining assets of the Trust, including accrued income, into two (2) equal shares, and shall distribute said shares as follows:",
                "   6.1(a) One (1) share shall be distributed to _________________________’s heirs-at-law, determined as of the date of death of the last individual having rights under this Trust Agreement, in such proportions as determined by the laws of descent and distribution of the state of my residency at death; and",
                "   6.1(b) One (1) share shall be distributed to _________________________’s heirs-at-law, determined as of the date of death of the last individual having rights under this Trust Agreement, in such proportions as determined by the laws of descent and distribution of the state of my residency at death. ",
                "ARTICLE 7.",
                "Beneficiaries Receiving Government Assistance",
                "Notwithstanding anything to the contrary contained herein, if the Trustee knows or reasonably believes that a beneficiary under this Trust Agreement is receiving (or may receive) government benefits under federal or state means-tested government benefit programs, then the Trustee shall, in the Trustee’s sole discretion, withhold any distribution otherwise permitted under this Trust Agreement. If a special needs trust has been established for the benefit of any beneficiary hereunder, then upon confirmation by the Trustee that it solely benefits a beneficiary hereunder, the Trustee shall have the absolute discretion to distribute such beneficiary’s share under this Trust Agreement to such special needs trust. If there is not an existing special needs trust, then the Trustee may create or retain such beneficiary’s share as a discretionary, non-support, spendthrift trust share for the benefit of such beneficiary. Alternatively, the Trustee may establish a third-party supplemental care trust for such beneficiary with such terms as the Trustee deems appropriate. The Settlors intend that any beneficiary under this Trust Agreement who is receiving (or may receive) government benefits under federal or state means-tested government benefit programs shall remain eligible for such government benefits, and the Settlors direct the Trustee to construe the meaning of this paragraph in accordance with the Settlors’ intentions."
            ],
            [
                "ARTICLE 8.",
                "Trustee and Successor Trust",
                `8.1 ${Trustee_1.text} and ${Trustee_2.text} will serve as the initial Co-Trustees of this Trust Agreement. If for any reason either _________________________ or _________________________ is unable or unwilling to serve or continue to serve, then the other of them shall serve as sole Trustee. If for any reason both _________________________ and _________________________ are unable or unwilling to serve or continue to serve, then the Settlors appoint `,
                "8.2 Any corporate successor to the trust business of any corporate Trustee designated herein or at any time acting hereunder will succeed to the capacity of its predecessor without conveyance or transfer.",
                "8.3 Any corporate Trustee will be entitled to compensation as provided in its regularly published schedule of fees, which schedule may be amended by the corporate Trustee from time to time",
                "8.4 The Settlors request that any family member who serves as Trustee hereunder serve in such capacity without any compensation other than the reimbursement of his or her out-ofpocket expenses. ",
                "8.5 Any substitute or successor Trustee will succeed as Trustee as though originally   identified as the Trustee under this Trust Agreement. All authority, powers, and discretions conferred on the original Trustee under this Trust Agreement will pass to any successor Trustee. No successor Trustee will be responsible for the acts or omissions of any prior Trustee, nor will any successor Trustee be under a duty to audit or investigate the accounts or administration of any prior Trustee. Unless requested in writing by a person having a present or future beneficial interest in any Trust, no successor Trustee will have any duty to take any action to obtain redress for any breach of trust committed by any prior Trustee. ",
                "8.6 The use of the term “Trustee” in this Trust Agreement will be a reference to the Trustee first above named and any substitute or successor Trustee as provided for herein.",
                "8.7 No bond will be required of any natural person acting as Trustee hereunder. ",
                "ARTICLE 9.",
                "Resignation, Removal and Appointment of Trustees",
                "9.1 A Trustee may resign at any time by giving written notice specifying the effective date of resignation to the Settlors or the Surviving Settlor, or the current adult income beneficiaries and a guardian of each current minor or disabled beneficiaries of the Trust if the Settlors are deceased or disabled.",
                "9.2 A Trustee may be removed under the following circumstances:",
                "    9.2(a) The Settlors or the Surviving Settlor may remove any Trustee hereunder by written instrument delivered to such Trustee. "
            ],
            [
                "   9.2(b) If both Settlors are deceased or disabled, the current adult income beneficiaries and a guardian of each current minor or disabled beneficiary may, by majority vote, remove any Trustee hereunder by written instrument delivered to such Trustee. ",
                "9.3 If a Trustee resigns, is removed, or otherwise is unable or unwilling to serve, then a Qualified Trustee will be appointed to serve as Successor Trustee as follows:",
                "     9.3(a) The Settlors or the Surviving Settlor may appoint a Qualified Trustee to serve as successor Trustee.",
                "     9.3(b) If both Settlors are deceased or disabled, then a Qualified Trustee may be appointed to serve as successor Trustee of such trust estate by a majority of the current adult income beneficiaries of the Trust and a guardian of each current minor or disabled beneficiary. ",
                "     9.3(c) If a successor Trustee is not appointed as provided in this Article within thirty (30) days of notice of a vacancy, then the next successor Trustee as named in Article 8 hereof will serve as successor Trustee. ",
                "9.4 This right of removal and/or appointment of a successor Trustee is a continuing right that may be exercised from time to time. Any appointment of a successor Trustee will be evidenced by a written instrument delivered to and accepted by the Qualified Trustee appointed as successor Trustee.",
                "9.5 If this Trust is divided into separate trusts, the same or different successor Trustees may be appointed for each such trust. ",
                "ARTICLE 10.",
                "Trustee’s Powers",
                "10.1 The Settlors intend that the Trustee will have the power to perform all acts, institute all proceedings, and exercise all rights, powers, and privileges that an absolute owner of any asset held in trust hereunder would have. The enumeration of certain powers herein will not limit the general or implied powers of the Trustee. In addition to the powers and authority granted by the laws of the jurisdiction where this Trust is administered, as they may be amended from time to time, the Trustee will have the discretionary powers set forth in this Trust Agreement with respect to any trust, which the Trustee may exercise without application to any court. ",
                "10.2 To compromise, adjust, and settle disputes and claims; to execute receipts and acquittances; and to institute and defend suits or legal proceedings. ",
                "10.3 To invest and reinvest in such stocks, bonds, certificates of deposit, and other securities and properties as the Trustee may deem advisable, including, without limitation, real property, common stocks and unsecured obligations, undivided interests, interests in investment trusts, mutual funds, legal and discretionary common trust funds, common funds maintained by the Trustee, leases, and property which is outside of the Settlors’ domicile; to deposit trust funds in a bank or trust company, including a bank or trust company operated by the Trustee and including any common trust fund of any such depository bank or trust company; and to maintain "
            ],
            [
                "margin accounts within any type of brokerage account, all without diversification as to the kind or amount and without being restricted in any way by any statute or court decision which now or hereafter exists regulating or limiting investments by fiduciaries.",
                "10.4 To transfer, sell, exchange, convey, improve, subdivide, partition, lease, mortgage, pledge, give options upon, or otherwise dispose of any security or property, real, personal, or mixed, which is held in trust hereunder, at public or private sale or otherwise for cash or other consideration or on credit and upon such terms and conditions, with or without security, and for such price as the Trustee may deem advisable, without any obligation upon any purchaser, transferee, vendee, or assignee to look to the application of the proceeds, and to execute good and sufficient deeds and other appropriate instruments of conveyance, assignment, or transfer.",
                "10.5 To lease any real estate for such term or terms, upon such conditions and rentals, and in such manner as the Trustee may deem advisable (with or without the privilege of purchase), and any lease so made will be valid and binding for the full term thereof even though the same will extend beyond the duration of any trust; to insure against fire or other risk; to make repairs, replacements, and improvements, structural or otherwise, to any such real estate; and to subdivide real estate, to dedicate the same to public use, and to grant easements as the Trustee may deem proper. ",
                "10.6 To borrow money from any source, including from the Trustee in an individual capacity, for any purpose connected with the protection or enhancement of the Trust or to carry out any of the provisions of the Trust, and as security, to mortgage or pledge any asset of the Trust upon such conditions as the Trustee deems proper. A lender may only look to trust assets for repayment of any loan, and no Trustee or beneficiary will be liable personally if trust assets are insufficient to repay any loan so made.",
                "10.7 To insure the assets of the Trust against damage or loss, and the Trustee against liability with respect to third persons.",
                "10.8 To determine whether, and in what manner, interest, dividends, rents, and other income will be apportioned in respect of time. ",
                "10.9 To make distribution hereunder of property, wholly or partly, in cash or in kind, and for that purpose to divide, partition, and allot property and to determine the value thereof, all in accordance with the provisions of this Trust Agreement; and the judgment of the Trustee as to the value of such properties and the division thereof will be binding on all persons. ",
                "10.10 To cause any securities or other property, real or personal, belonging to any trust, to be held or registered in the Trustee’s name or in the name of the Trustee’s nominee, or in such other form as the Trustee may deem best, without disclosing any trust relationship; PROVIDED, HOWEVER, the Trustee will be liable for any act of the nominee in connection with the securities or other property so held. ",
                "10.11 To sell and exercise any “rights” issued on any security held in trust hereunder; to pay calls, assessments, and any other sums chargeable or accruing against or on account of securities."
            ],
            [
                "10.12 To vote, in person or by general or limited proxy, any stock or security held in trust hereunder including the power to retain in trust and vote a security issued by a bank or financial institution; to consent, directly or through a committee or other agent, to the reorganization, consolidation, merger, dissolution, or liquidation of a corporation or other business enterprise. ",
                "10.13 To perform, compromise, or refuse performance of contracts that continue as obligations of the Settlors’ estates, as the Trustee determines under the circumstances. In performing such enforceable contracts of the Trust, the Trustee, among other possible choices of action, may effect a fair and reasonable compromise with a debtor or obligor, or extend, renew, or in any manner modify the terms of an obligation owing to the Trust. A Trustee who holds a mortgage, pledge, or other lien upon property of another person, may, in lieu of foreclosure, accept the conveyance or transfer of encumbered assets from the owner thereof in satisfaction of the indebtedness secured by lien. ",
                "10.14 To pay taxes, assessments, compensation of the Trustee, and other expenses incurred in the collection, care, administration, and protection of the Trust.",
                "10.15 To abandon, in any way, property which the Trustee determines not to be worth protecting. ",
                "10.16 To make appropriate provisions for depositing securities with any legal depository.",
                "10.17 To employ accountants, attorneys, securities brokers, and such agents as the Trustee may deem advisable, even though any such agent may be a subsidiary or partner of the Trustee, to pay reasonable compensation for their services, and to charge the same to (or apportion the same between) income and principal as the Trustee may deem proper.",
                "10.18 To refrain from or to take any action and to refrain from or to make any election, in the Trustee’s reasonable discretion, which the Trustee is permitted by law to make or not make; to minimize the tax liabilities of any trust, the Settlors’ estates, and the beneficiaries, if in the Trustee’s reasonable discretion, it is deemed desirable to do so; and to allocate or charge, or fail to allocate or charge, in the Trustee’s reasonable discretion, the benefits or costs thereof among various beneficiaries",
                "10.19 To merge the assets of any trust with those of any other trust having the same beneficiaries and having similar provisions so as to allow the Trustee to hold the assets of all of such trusts as a single trust, providing that the integrity of any such trust is not violated. ",
                "10.20 To determine the identity of all persons having a vested or non-vested beneficial interest in the Trust, with or without legal proceedings. ",
                "10.21 To hold property otherwise directed to be added to or consolidated with the trust estate of any trust held hereunder as a separate trust having terms identical to the terms of the existing trust; to sever any trust on a fractional basis into two (2) or more separate trusts for any reason; to segregate by allocation to a separate account or trust a specific amount out of, a portion of, or specific assets included in, the trust estate of any trust held hereunder to reflect a partial disclaimer or for any tax or other reason in a manner consistent with any applicable rules or regulations. Income earned on a segregated amount, portion or specific assets after the segregation ",
            ],
            [
                "is effective will be held, administered, and distributed pursuant to the terms of such separate trust.In administering the trust estate of any separate account or trust and in making applicable tax elections, the Trustee will consider the differences in federal tax attributes and all other factors the Trustee believes pertinent. A separate trust created by severance or segregation will be treated as a separate trust for all purposes from and after the date designated by the Trustee as the effective date of the severance or segregation and will be held on terms and conditions that are equivalent to the terms of the trust from which it was severed or segregated so that the aggregate interests of each beneficiary in the several trusts are equivalent to the beneficiary’s interests in the trust before severance or segregation.",
                "10.22 To, in the Trustee’s reasonable discretion and without court order, retain any farm property, even though that property may constitute all or a large portion of the trust estate, and to acquire other farm property; to engage in farm operations and the production, harvesting, and marketing of farm products, including livestock breeding and feeding, poultry farming, and dairy farming, whether by operating directly with hired labor, by retaining farm managers or management agencies (including any such agency which is in any way affiliated with any corporate Trustee acting hereunder), or by renting on shares or for cash; to enter into farm programs; to purchase or rent farm machinery and equipment; to purchase livestock, poultry, fertilizer, seed, and feed; to improve the farm property, and to repair, improve, and construct farm buildings, fences, irrigation systems, and drainage facilities; to develop, lease, or otherwise dispose of any mineral, oil, or gas property or rights; to borrow money for any of the purposes described in this paragraph; and in general to do all things customary or desirable in farm operations. ",
                "10.23 To use and expend the Trust income and principal to i) conduct environmental assessments, audits, and site monitoring to determine compliance with any environmental law or regulation thereunder, ii) take all appropriate remedial action to contain, clean up or remove any environmental hazard including a spill, release, discharge, or contamination, either of the Trustee’s own accord or in response to an actual or threatened violation of any environmental law or regulation thereunder, iii) institute legal proceedings concerning environmental hazards or contest or settle legal proceedings brought by any local, state, or federal agency concerned with environmental compliance, or by a private litigant, iv) comply with any local, state, or federal agency order or court order directing an assessment, abatement, or cleanup of any environmental hazards, and v) employ agents, consultants, and legal counsel to assist or perform the above undertakings or actions. Any expenses incurred by the Trustee under this paragraph may be charged against income or principal as the Trustee will determine. ",
                "10.24 To receive any property, real or personal, to be added to the Trust from the Settlors’ estates (and if the Trustee consents in writing, from any other person) by lifetime or testamentary transfer or otherwise; PROVIDED, HOWEVER, that the Trustee, in the Trustee’s sole discretion, may require, as a prerequisite to accepting property, that the donating party provide evidence satisfactory to the Trustee that i) the property is not contaminated by any hazardous or toxic materials or substances; and ii) the property is not being used and has never been used for any activities directly or indirectly involving the generation, use, treatment, storage, disposal, release, or discharge of any hazardous or toxic materials or substances. ",
                "10.25 In allocating assets among separate trusts, the Trustee is specifically authorized to select any one or more particular assets to fund one trust with different assets funding other trusts.",
            ],
            [
                "It is the Settlors’ intention that certain assets may be better suited for one particular beneficiary’s trust versus other assets and the Trustee is encouraged in the Trustee’s sole and absolute discretion to make such allocations at the time of the division into separate trusts for separate beneficiaries.",
                "10.26 No Trustee will be liable for any loss or depreciation in value sustained by the Trust as a result of the Trustee accepting or retaining any property upon which there is later discovered to be hazardous materials or substances requiring remedial action pursuant to any federal, state, or local environmental law unless the Trustee contributed to the loss or depreciation in value through willful default, willful misconduct, or gross negligence. The failure of the Trustee to obtain the evidence referred to in the preceding paragraph will not be considered the willful default, willful misconduct, or gross negligence of the Trustee. ",
                "10.27 Notwithstanding anything to the contrary contained herein, the Trustee may withhold a distribution of real estate to a beneficiary until receiving from the beneficiary an indemnification agreement in which the beneficiary agrees to indemnify the Trustee against any claims filed against the Trustee as an “owner” or “operator” under the Comprehensive Environmental Response, Compensation and Liability Act of 1980, as from time to time amended, or any regulation thereunder. ",
                "10.28 To acquire by purchase, exchange, or otherwise, property, real or personal, from the Executor or administrator of the Settlors’ estates, although such property may not be of the character prescribed by law or by the terms of this Trust Agreement for the investment of trust funds and although the acquisition of such property may result in a large percentage of any trust hereunder being invested in one (1) class of property, all without liability for loss or depreciation, except for the Trustee’s own negligence; and to retain the property so acquired so long as the Trustee will deem advisable.",
                "10.29 To invest in any assets without being limited by any statute or judicial decision imposing requirements as to assets in which investments may be made or the retention or diversification of investments. Any aspect of any diversification requirement that would apply is hereby negated. Notwithstanding any law, custom, or practice to the contrary, the Trustee will be under no obligation to change the form of any investment held hereunder.",
                "10.30 Unless otherwise provided herein, in making discretionary distributions of principal hereunder, the Trustee may, but will not be required to, take into consideration all other income, property, annuities, and sources of support available to the prospective recipients of the distribution known to the Trustee. ",
                "10.31 To access, modify, control, archive, transfer, and delete the Settlors’ digital assets. Digital assets include the Settlors’ sent and received emails, email accounts, digital music, digital photographs, digital videos, gaming accounts, software licenses, social-network accounts, filesharing accounts, financial accounts, domain registrations, Domain Name System (DNS) services accounts, blogs, listservs, web-hosting accounts, tax-preparation service accounts, online stores and auction sites, online accounts, including but not limited to Bitcoin and Crypto currency and any similar digital asset that currently exists or may be developed as technology advances. The Settlors’ digital assets may be stored in the cloud or on the Settlors’ own digital devices. The Trustee may access, use, and control the Settlors’ digital devices in order to access, modify, ",
            ],
            [
                "control, archive, transfer, and delete the Settlors’ digital assets. This power is essential for access to the Settlors’ digital assets that are only accessible through Settlors’ digital devices. Digital devices include desktops, laptops, tablets, peripherals, storage devices, mobile telephones, smartphones, and any similar hardware that currently exists or may be developed as technology advances. ",
                "10.32 Whenever two or more Trustees are serving as Co-Trustees, joint or mutual powers given to the Co-Trustees by this Trust Agreement, or applicable law, must be exercised by all of the Co-Trustees; PROVIDED, HOWEVER, a Co-Trustee shall have the power, without order of the court, at any time and from time to time to delegate to the other Trustee any or all of the Trustee’s powers unless the other Trustee is prohibited from exercising such powers under this Trust Agreement or by law. This power of delegation may be exercised by (a) the delegating Trustee delivering to the other Trustee written notice specifying the powers delegated and (b) the other Trustee signing such notice indicating consent to the delegation. Such delegation shall remain effective for the time specified in the notice or until earlier termination by either the delegating or consenting Trustee by delivery to the other Trustee of written notice of termination. The delegating Trustee shall not be personally liable to the beneficiaries of the Trust or to any other party with respect to the exercise or nonexercise of powers delegated during the period of such delegation. Further, if there are at any time more than two Trustees serving as such on behalf of the Trust, and the Trustees cannot agree on any given decision, then the majority of the Trustees shall prevail; provided that, in the event that a majority decision cannot be established, whether by reason of an equal split decision by an even number of Trustees or by circumstances of abstention and/or other refusals to act, or otherwise, any Co-Trustee may institute an arbitration under the rules of the American Arbitration Association, for a determination as to which action (or decision not to act), then in dispute, is in the best interest of the trust estate in question.",
                "ARTICLE 11.",
                "Appointment of Independent Special Trustee",
                "11.1 If for any reason the Trustee of any trust created under this instrument is unwilling or unable to act with respect to any provision herein or tax matter affecting a trust hereunder, the Trustee shall appoint, in writing, a corporate fiduciary or independent individual to serve as an Independent Special Trustee with respect to such provision or tax matter. ",
                "11.2 An Independent Special Trustee will exercise all fiduciary powers granted by this Trust unless expressly limited by the Trustee appointing the Independent Special Trustee. An Independent Special Trustee may resign at any time by delivering written notice of resignation to the Trustee.",
                "ARTICLE 12.",
                "Generation-Skipping Provisions",
                "12.1 Regardless of other provisions herein to the contrary, whenever a particular trust estate hereunder would have an inclusion ratio of other than zero, after any intended allocation to the trust of generation-skipping tax (“GST”) exemption, on account of an allocation or addition of assets to the trust, then, prior to such allocation or addition (and any intended application of GST exemption), the Trustee will divide the trust (and/or the assets to be allocated or added to it) into two separate parts, each to be administered as a separate trust upon terms identical with those of ",
            ],
            [
                "the original trust. One separate trust (after any intended allocation of GST exemption) will have an inclusion ratio of zero (the “GST Exempt Trust”) and the other separate trust will have an inclusion ratio of more than zero (the “GST Non-Exempt Trust”). The GST Exempt Trust and the GST Non-Exempt Trust created from an original trust will be referred to as “related trusts.” ",
                "12.2 In addition, and regardless of other provisions herein to the contrary, the Trustee will have authority to: ",
                "     12.2(a) Make distributions of income and principal from related trusts, including upon the termination of related trusts, from the GST Exempt Trust to skip persons and from the GST Non-Exempt Trust to non-skip persons, so as to maximize the total assets from the related trusts which the beneficiaries of the related trusts eventually will receive after payment of all applicable transfer taxes; and",
                "     12.2(b) Pay federal and state transfer taxes payable from or on account of one or both of the related trusts from the GST Non-Exempt Trust to the extent possible. ",
                "12.3 The Trustee will not make discretionary distributions for the health, education, support, and maintenance of a trust beneficiary from the income or principal of the GST Exempt Trust to beneficiaries who are non-skip persons so long as there are readily available assets in the GST Non-Exempt Trust to accomplish such objectives. In making distributions to non-skip persons, the Trustee should consider making sufficient distributions to utilize the non-skip person’s unified credit provided by Code Section 2010 and the non-skip person’s gift and estate tax brackets set forth in Code Section 2001 if, by making such distributions, the Trustee believes the inclusion in such non-skip person’s estate or if a gift were to subsequently be made by such non-skip person may achieve significant savings in transfer tax by incurring an estate tax or gift tax, rather than a generation-skipping transfer tax which would otherwise be imposed, and thereby increase the amount of property ultimately passing to at least some beneficiaries of the trust.",
                "12.4 If a Trust may exist under this agreement for which generation-skipping taxes may apply to distributions therefrom, and the beneficiary of such Trust who is a lineal descendant of mine may have an estate which would, for tax purposes, be subject to no tax or a rate of tax less than the rate of taxes imposed under Chapter 13, an Independent Trustee shall be appointed by a majority of the current adult beneficiaries of the Trust and a guardian for each current minor or disabled beneficiary of the Trust, and is hereby granted the power to grant and convert all or any portion of such beneficiary’s interest into an interest with a testamentary general power of appointment so as to cause an amount of property to be included in such beneficiary’s taxable estate with the result that the resulting death taxes would be less than the Chapter 13 taxes. The Independent Trustee may convert any general testamentary power of appointment granted to such a beneficiary, whether pursuant to this paragraph or elsewhere in this instrument, back to a limited testamentary power of appointment if the Trustee deems it best to do so. As it is the Settlors’ desire and intent to reduce the impact of Chapter 13 taxes, as aforesaid, the Trustee will not be liable to any party for its discretionary exercise of such powers in order to minimize or avoid the imposition of Chapter 13 taxes. ",
                "12.5 The definitions of “inclusion ratio,” “GST exemption,” “skip persons,” and “nonskip persons” will be those set forth for such terms by Chapter 13 of the Code. ",
            ],
            [
                "ARTICLE 13.",
                "Miscellaneous Provisions",
                "13.1 Incidental Benefits. After the death of the Deceased Settlor, the Trustee may make distributions to or on behalf of a beneficiary even though such distributions result in an incidental benefit to a guardian or the person having custody of the beneficiary. ",
                "13.2 Legal Support. Notwithstanding anything to the contrary contained in this Trust Agreement, no distributions of the trust property will be made by the Trustee to any beneficiary of this Trust Agreement if such distribution would be deemed to satisfy a legal support obligation of an individual serving as Trustee hereunder at the time of the distribution. The use of the phrase “legal support obligation” will refer to the legal support obligations of a parent to his or her child. ",
                "13.3 Minority or Disability of a Beneficiary. During the minority or disability of a beneficiary hereunder, the Trustee may make any distributions authorized under this Trust Agreement in any one (1) or more of the following ways: directly to the beneficiary in such amounts as may be deemed advisable as an allowance; to the guardian of the person or property of the beneficiary; or to a relative of the beneficiary upon the agreement of such relative to expend such income or principal solely for the benefit of the beneficiary. The receipt by any such person will constitute a complete acquittance to the Trustee for any funds or property so distributed, and the Trustee will have no responsibility for the proper application thereof. ",
                "13.4 Special Power of Appointment. Any special power of appointment granted herein is an exclusive power which may be exercised in favor of one or more objects of the power to the exclusion of any others provided such exercise does not satisfy a legal support obligation of the powerholder. If this special power of appointment is exercised in further trust, the object of the power is authorized: to select a new situs for any such trust and to provide that the law of that new situs will govern such trust, to retain or modify the definition of Qualified Trustee, to restrict or grant trust powers, to impose spendthrift restrictions and other conditions, to create a Trustee Appointment Committee and define its powers and duties, to create life or term interests for one or more objects of that power, and to grant additional non-general powers of appointment exercisable in favor of the objects of any special power of appointment granted herein. ",
                "13.5 Testamentary Power of Appointment. With regard to any testamentary power of appointment given herein, the Trustee will consider any writing which is admitted to probate by a court of competent jurisdiction as a Last Will and Testament and will not be liable for actions in reliance thereon. If no writing purporting to be a Last Will and Testament by the powerholder is probated within three (3) months of such person’s death, Trustee may presume that no Last Will and Testament exists, and Trustee will not be liable for acting under such presumption. However, this provision will not limit an object of any power of appointment given herein to pursue any property affected by the exercise of it, regardless of the place or time of probate of a Last Will and Testament of the powerholder. ",
                "13.6 In Terrorem. If valid under the laws of the state having jurisdiction over the administration of any trust created hereunder, any beneficiary under this Trust Agreement who contests the probate of either of the Settlors’ Last Will and Testament or of any of its provisions, or any of the provisions of this Trust Agreement, or any beneficiary designation, or elects to take ",
            ],
            [
                "a statutory share of either of the Settlors’ estate, will be deemed to have predeceased the Deceased Settlor for purposes of this Trust Agreement. ",
                "13.7 Specific Distributions. To the extent the Deceased Settlor has provided for a specific distribution herein, the Deceased Settlor directs such distribution shall be paid out of Deceased Settlor’s separate property, and then from his or her share of community property. ",
                "13.8 Perpetuities. Notwithstanding any other provision in this Trust, each trust established hereunder (other than a Contingent Trust) shall, unless terminated earlier according to its terms, terminate 300 years after the date this trust becomes irrevocable. Upon such a termination, the assets of the Trust will be distributed to the beneficiaries then entitled to receive the income in proportion to their interest in said income",
                "13.9 Spendthrift. Upon the death of the Surviving Settlor, no beneficiary hereunder will have any right or power to anticipate, pledge, assign, sell, transfer, or alienate (by operation of law, legal process, or otherwise), or encumber his or her interest (in income or principal) in any Trust, in any way; nor will any such interest in any manner be liable for or subject to the debts, liabilities or obligations of such beneficiary or claims of any sort against such beneficiary. Notwithstanding the foregoing to the contrary, nothing contained in this Article will be construed to restrict in any way the exercise of any power of appointment granted hereunder. ",
                "13.10 Accounting. Upon either of the Settlors’ request or the request of any beneficiary hereunder when otherwise required by the law of the Trust’s governing jurisdiction, or at the discretion of the Trustee, the Trustee will make an accounting regarding the transactions of the Trust by delivering a written report to the Settlors, if living, or if neither of the Settlors is living, then to all adult income beneficiaries and to the parent or guardian of any minor beneficiary to whom or for whose benefit income from the Trust is then payable. ",
                "13.11 Distributions. Unless the Trustee receives from some person interested in this Trust written notice of any deaths, births, marriages, or other events on which the right to receive income or principal of the trust property may depend, the Trustee will incur no liability for any distributions made or omitted in good faith. ",
                "13.12 Trustee Liability and Discretion. The Trustee will be responsible only for due diligence in the administration and disbursement of the assets of any Trust created hereunder and will not be responsible for any loss or subject to any liability except by reason of the Trustee’s own negligence or willful default proved by affirmative evidence; and every election, determination, or other exercise by the Trustee of any discretion granted to the Trustee, expressly or by implication under this Trust Agreement or by law made in good faith, will fully protect the Trustee and will be conclusive and binding upon all persons interested in any Trust created under this Trust Agreement.",
                "13.13 Minimum Distribution Rules. If any asset is subject to the “minimum distribution rules” of Section 401(a)(9) of the Code, the Trustee will supply to each plan administrator or individual retirement account trustee, as the case may be, a copy of this Trust Agreement, as may be amended from time to time prior to the Settlors’ death, or otherwise comply ",
            ],
            [
                "with the requirements of Section 401(a)(9) of the Code and the Regulations thereunder, as soon as practicable following the Settlors’ death.",
                "13.14 Incorporation. Should any Trust Agreement referred to herein be determined to be unenforceable or otherwise not in effect for whatever reason, then the Settlors incorporate herein by reference the terms thereof and direct that such terms apply to the disposition of the trust property or portion hereof as provided in the heretofore Article or Articles as if fully set out herein at length. ",
                "13.15 Headings. The article headings herein are inserted only as a matter of convenience and for reference, and will in no way be construed to define, limit, or describe the scope or intent of any provisions contained in this Trust Agreement, nor in any way affect this Trust Agreement.",
                "13.16 Gender; Plural. For purposes of this Trust Agreement, words in any gender will include all genders, and words in the singular will include the plural and vice versa, in each case unless the context otherwise requires. ",
                "13.17 Effective Date and Governing Law. This Trust Agreement will be effective on the date it is executed by the Settlors. This Trust Agreement will be construed and administered, and the validity of each Trust hereunder will be determined, in accordance with the laws of the State of Texas, without giving effect to its conflicts of law principles. The Trustee may amend this paragraph and take any other action in order to change the jurisdiction whose law will govern the construction, administration and validity of any Trust hereunder, and to amend any other provision of this Trust Agreement solely for such purposes. The jurisdiction whose law governs the construction, administration and validity of any Trust may, but need not, be the same as the situs of the administration of such Trust. Notwithstanding anything to the contrary in this paragraph, if the Trustee is the Surviving Settlor or the Surviving Settlor’s issue, then such Trustee will not have the powers as provided in this third sentence of this paragraph, and such powers will be exercised, if at all, by the successor Trustee as named under this Trust Agreement who is not the Surviving Settlor or the Surviving Settlor’s issue, or if there is no such successor Trustee who is not the Surviving Settlor or the Surviving Settlor’s issue, then by an Independent Trustee. ",
                "13.18 Distributions are Separate Property of Beneficiaries. It is the Settlors’ intent that all distributions of both income and principal to any beneficiary shall be deemed gifts and shall constitute the sole and separate property of the beneficiary receiving the distribution. Further, it is the Settlors’ direction that the trust property shall never be subject to equitable distribution by any court under the laws of any state. ",
                "13.19 Counterparts. This Trust Agreement may be executed in counterparts and such counterparts taken together will constitute a single instrument.",
                "[Signature Page Follows] ",
            ],
            [
                "IN WITNESS WHEREOF, the Settlors and the Co-Trustees, in acceptance of this Trust, have executed this Trust Agreement the day and year first above written. ",
                "____________________________________________",
                `${name.text}, Settlors `,
                "____________________________________________",
                `${name.text}, Settlors `,
                "____________________________________________",
                `${Trustee_1.text}, Trustees `,
                "____________________________________________",
                `${Trustee_1.text}, Trustees `,
                "STATE OF TEXAS ______________________)",
                "_____________________________________)SS",
                "COUNTY OF____________________________)",
                "Subscribed, sworn to and acknowledged before me by _________________________ and ",
                "_________________________ as Settlors and Co-Trustees, this the ______ day of ",
                "_______________, 2025.",
                "____________________________________________",
                "NOTARY PUBLIC",
                "My commission expires:",
                "____________________________________________"

            ]
        ];

       const flattenedContent = pagesContent.flat();

    let page = pdfDoc.addPage([600, 800]);
    let y = 750;

    for (const text of flattenedContent) {
        if (y < 50) {
            page = pdfDoc.addPage([600, 800]);
            y = 750;
        }

        const isDynamicText = this.replacedValues.some(value =>
            text.includes(value)
        );

        if (isDynamicText) {
            y = this.addWrappedText(page, text, 50, y, boldFont, textFontSize, 500, true, rgb(0, 0, 0));
        } else if (this.shouldSkipBoldOrCentering(text)) {
            y = this.addWrappedText(page, text, 50, y, font, textFontSize, 500, false);
        } else if (this.shouldCenterText(text)) {
            y = this.addCenteredText(page, text, y, boldFont, titleFontSize, true);
        } else {
            const isHeader = this.isHeader(text);
            const fontToUse = isHeader ? boldFont : font;
            const colorToUse = isHeader ? rgb(0, 0, 0) : rgb(0.3, 0.3, 0.3);
            const textSize = isHeader ? titleFontSize : textFontSize;
            y = this.addWrappedText(page, text, 50, y, fontToUse, textSize, 500, isHeader, colorToUse);
        }

        y -= 20;
    }
        
        // Save and download
        const pdfBytes = await pdfDoc.save();
        this.downloadPDF(pdfBytes, "living_trust_Agreement.pdf");
    }
        
        
        
        public shouldSkipBoldOrCentering(text: string): boolean {
            const excludeList = ["NOTARY PUBLIC", "My commission expires:"];
            return excludeList.includes(text);
        }
        
        public shouldCenterText(text: string): boolean {
            return /^ARTICLE\s\d+\.|^A-Z\s+$/.test(text) || text.length < 30;
        }
        
        public isHeader(text: string): boolean {
            return /^A-Z\s+$/.test(text) && /\b(ARTICLE|SECTION|CHAPTER|AGREEMENT)\b/.test(text);
        }
        
        public isArticle(text: string): boolean {
            return /^ARTICLE\s\d+\.$/.test(text);  // Checking if the line starts with 'ARTICLE X.'
        }
        
        public addCenteredText(page: any, text: string, y: number, font: any, size: number, isHeader: boolean): number {
            const textWidth = font.widthOfTextAtSize(text, size);
            const centerX = (600 - textWidth) / 2;
            page.drawText(text, { x: centerX, y, size, font, color: rgb(0, 0, 0) });
            return y - size - 2;
        }
        
        public addWrappedText(page: any, text: string, x: number, y: number, font: any, size: number, maxWidth: number, isHeader: boolean, color: any = rgb(0, 0, 0)): number {
            const words = text.split(' ');
            let line = '';
            const articleFontSize = 9; // Font size for articles
            const articleColor = rgb(0.3, 0.3, 0.3); // A more dull color for articles
        
            if (this.isArticle(text)) {
                size = articleFontSize;  // Apply smaller font size for articles
                color = articleColor;  // Apply a dull color for articles
            }
        
            for (const word of words) {
                const testLine = line + word + ' ';
                const textWidth = font.widthOfTextAtSize(testLine, size);
                if (textWidth > maxWidth && line !== '') {
                    page.drawText(line, { x, y, size, font, color });
                    y -= size + 2;  // Move to next line
                    line = word + ' ';
                } else {
                    line = testLine;
                }
            }
            page.drawText(line, { x, y, size, font, color });
            return y - size - 2;
        }
        

    public downloadPDF(pdfBytes: Uint8Array, filename: string): void {
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
}
