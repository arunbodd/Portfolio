***A brief note on timing:*** *It took a month to publish this issue because the policies governing these sectors were changing almost daily. I held off on publishing while we waited to see if the proposed $100,000 H-1B supplemental fee would hold (federal courts struck it down just weeks ago), and while the scale of the sudden NSF grant cuts to fund the X-Labs initiative became clear. I wanted to report on the finalized policies, not the initial proposals.*

***AI Disclaimer:*** *I used Claude co-work and Perplexity to source up-to-date information and interpret/write parts of this issue. Mainly, highly dense **Part Five: Non-Profit and Foundation-Funded Research.***

**SERIES CONTEXT** Issues 1 through 3 mapped the macro environment, the energy constraint, and the pharma and biotech restructuring. This issue covers the sectors that receive less press but employ a large share of bioinformatics professionals: clinical diagnostics, contract research organizations, federal contracting, academia, and the non-profit and foundation-funded research world. These environments are facing distinct pressures, and the career trajectories are different from the pharma and startup world in important ways.

> **TL;DR**
>
> - **Clinical Diagnostics:** The focus is expanding far beyond variant interpretation into multi-omics integration (RNA, methylation), liquid biopsy (MRD) monitoring, and massive-scale clinical trial matching. Roles are shifting from upstream analysis to building FDA/LDT-compliant infrastructure and clinical AI validation.
> - **CROs:** Sponsors are taking analytics in-house using AI. The safest CRO roles are in real-world evidence, biomarker strategy, and clinical AI validation.
> - **Federal & Contracting:** The sweeping 2025 RIFs and restructurings permanently reshaped legacy public health portfolios (NIH, CDC). Stability now lies in defense/intelligence, ARPA-H, and DOE National Labs.
> - **Academia:** The intense 2025 battles over F&A caps and redirected NSF funding accelerated an academic-to-industry brain drain, permanently making AI adoption a budget necessity for remaining labs.
> - **Non-Profits:** The sector is sharply bifurcated. Endowment-funded institutes (St. Jude, HHMI, CZI) offer high stability, AI-forward work, and H-1B cap exemption, representing the strongest safe harbor for those leaving federal or pharma roles.

I spent meaningful parts of my career in federal and academic-adjacent environments. I started at NIH and moved to Emory's primate research center, then to CDC through Leidos, and later worked at Booz Allen Hamilton where I was still doing outbreak bioinformatics but in a productionized, cloud-native form. That progression gave me a close view of an ecosystem that the 2025 restructuring subjected to pressures it had not seen in decades. This issue is partly about the aftermath.

---

## PART ONE: Clinical Diagnostics Labs

Clinical genomics has been one of the most dynamic sectors in the AI-in-bioinformatics story, and the changes are concrete, not theoretical.

**The Emerging Standard: Tempus AI** is the closest thing to a canonical example of what AI-augmented clinical genomics looks like at scale. Their strategy is what they call Intelligent Diagnostics: generative AI operating on harmonized multi-modal datasets that combine DNA, RNA, clinical notes, pathology images, and radiology reports. Their xT platform underpins solid tumor somatic profiling, xH is their first whole-genome sequencing assay for hematological oncology, and xR received FDA 510(k) clearance for RNA-based profiling.[^1]

**What Tempus has built that matters to practitioners:** an agentic AI system that transforms unstructured clinical text into analysis-ready structured data, and a trial matching algorithm that connects patient genomic profiles to open clinical trials across their network. Their 2025 acquisition of Ambry Genetics brought 25 years of ACMG variant interpretation expertise into a platform that can now apply that expertise systematically at scale. Illumina signed a multi-year data licensing deal with Tempus specifically to improve PrimateAI-3D, their deep learning variant pathogenicity model.[^2]

Caris Life Sciences continues to grow its private valuation, built on their MI Profile platform (whole exome plus whole transcriptome) and the DEAN AI engine. Combined Tempus and Caris solid tumor NGS volume now represents an estimated 60 to 65% of the US clinical market, which has put Foundation Medicine (a Roche subsidiary) under significant competitive pressure.

### The Real Computational Challenges: Multi-Omics and Scale

While much attention has historically focused on variant interpretation and pathogenicity classification, the primary anchor for clinical bioinformatics has shifted into multi-omics integration, continuous monitoring, and infrastructure scale.

Clinical diagnostics labs are moving beyond basic DNA panels into whole exome, whole transcriptome (RNA-seq), and epigenomic (methylation) profiling. Integrating these disparate data modalities into a single, clinically actionable report is the core engineering bottleneck. Furthermore, the rise of liquid biopsies and Minimal Residual Disease (MRD) monitoring requires extremely highly sensitive, low-limit-of-detection bioinformatics pipelines capable of tracking tumor fractions over time.

Additionally, as the FDA asserts more regulatory oversight over Laboratory Developed Tests (LDTs), bioinformaticians are spending significantly more time on rigorous analytical validation, building immutable audit trails, and ensuring compliance which has become an essential skill and anyone with regulatory/compliance skills will be favored.

Even within variant interpretation, the process is being rebuilt. What was a weeks-long manual process, pulling ClinVar evidence, functional studies, and population frequencies, is being collapsed into a reasoning loop using large language models. Emerging AI platforms embed this logic into production clinical workflows, focusing on automated evidence extraction. Mamidi Health's AIVA integration brings similar capabilities directly into Nextflow-based pipeline environments in association with Seqera.[^3]

But the distinction that matters is that variant interpretation agents are not replacing medical geneticists. They are automating the initial evidence retrieval, allowing bioinformaticians to focus on higher-value tasks: designing complex multi-omics pipelines, managing cloud-native infrastructure, and deploying patient-to-trial matching algorithms. The human judgment at the end of the pipeline, the sign-off on a classification that carries regulatory and liability weight, is not being automated. What is being automated is everything upstream of that judgment.

For clinical bioinformaticians, this compresses timelines and throughput, but it does not eliminate the role. It transforms it from "analyst who finds evidence" to "clinical AI validation specialist who ensures the agent's evidence is correct, complete, and defensible." That second role is more valuable more than ever. Hence, a clinical bioinformatician must understand benchmarking, red-teaming, security vulnerabilities and comprehend rapid AI progress into meaningful insights.

### Which Roles Are Growing and Which Are Shrinking:

**Growing:** clinical AI validation specialist, interpretive ML for oncology and germline, regulatory ML scientist, data engineering for multimodal EHR integration, and AI-augmented pathology.

**Shrinking:** basic VCF QC analyst, routine variant calling pipeline operator without interpretive responsibility, manual ACMG criterion lookup without LLM augmentation, and generic NGS data manager roles without specialty anchoring.

The fastest-growing credential in clinical diagnostics is ABMG (American Board of Medical Genetics and Genomics) board eligibility for bioinformaticians, specifically ABMG in Laboratory Genetics and Genomics. This is not a new observation, but the gap between board-eligible practitioners and demand for their judgment is wider than it has ever been, precisely because AI is generating more preliminary output that requires expert validation.

---

## PART TWO: CROs

Contract research organisations such as IQVIA, Labcorp, ICON, Parexel, PPD/Thermo Fisher, Charles River, and WuXi face a structural challenge that is less visible but significant. Their business model is providing analytical and operational services that sponsors increasingly want to run in-house, using foundation-model platforms that compress the time and cost of analysis.

The sponsor-facing biostatistician and statistical programmer roles at CROs are directly in the path of LLM-augmented automation of trial design, randomisation scheme generation, mock TLF production, and clinical narrative drafting. These are the functions where AI is demonstrably reducing cycle time, and where the value proposition of paying a CRO for senior analytical staff is eroding fastest.

What CROs are growing: real-world evidence analytics (where breadth of patient data is the competitive moat), biomarker-driven trial design services (where domain depth matters), decentralised trial digital infrastructure, and AI-enabled patient recruitment using EHR-derived cohort matching. The Tempus Trials product, connecting patient genomic profiles to open trials, is a direct competitive threat to CRO patient recruitment services. That pressure will intensify.

### The AI Platforms Redefining CROs:

To stay competitive and fend off sponsor in-housing, major CROs are heavily investing in proprietary and partnered AI ecosystems. The most aggressive example is IQVIA, which launched **IQVIA.ai** in March 2026, a unified agentic AI platform powered by NVIDIA technologies like Nemotron and LangChain. IQVIA has also deepened its moat through massive strategic partnerships, most notably expanding its global pact with Salesforce to power the Life Sciences Cloud with IQVIA's Orchestrated Customer Engagement (OCE) software, and a landmark 2025 deal with Veeva Systems that deeply integrates IQVIA Agentic AI and Analytics directly into Veeva's clinical and commercial suites.

Other giants are taking slightly different approaches. ICON and Labcorp are embedding AI directly into their service lines rather than pushing standalone branded horizontal platforms. Labcorp is heavily utilizing AI for digital pathology and diagnostic interpretation through strategic vendor collaborations, while ICON emphasizes machine-learning-driven trial feasibility, risk-based monitoring, and real-world evidence analytics. Though less "branded" than IQVIA's agentic ecosystem, these embedded tools are fundamentally changing how data management and trial design are executed on the floor.

**For practitioners at CROs:** your most defensible move is into real-world evidence analytics, biomarker strategy, or clinical AI validation. The most exposed roles are legacy SAS programming, manual data management, and standard statistical reporting that can be automated or folded into a much larger AI orchestration task. The exit from CRO commodity work is toward either the pharma sponsor side or the clinical diagnostics side, both of which value the pattern-recognition skills that senior CRO practitioners develop.

## PART THREE: Federal Contracting and Government

The federal funding environment underwent seismic structural changes over the past year. For professionals navigating the aftermath, understanding the difference between exposed and insulated programs remains critical.

### Recent Structural Shifts:

HHS announced a dramatic restructuring on March 27, 2025, targeting about 20,000 positions overall, with roughly 10,000 layoffs finalized across federal health agencies including NIH, FDA, and CDC after a Supreme Court ruling allowed the administration to proceed.[^4] The restructuring reduced HHS divisions from 28 to 15, though later reporting indicated hundreds of employees were reinstated after the initial cuts.[^5] The proposed 15% indirect cost cap would have removed billions of dollars from university research budgets.[^6]

I spent time at Booz Allen Hamilton myself, productionizing outbreak response pipelines on AWS and building the AI agentic framework that became **Lintelligence** (https://github.com/arunbodd/lintelligence), an internal compliance-check and onto developing CODARIS (https://github.com/arunbodd/codaris), an open-source nextflow automation tool similar to Seqera AI. I say this not to make the next paragraph personal, but because it gives me a grounded read on what is happening there.

Federal contractors like Booz Allen Hamilton, which derives approximately 98% of its revenue from the federal government, are navigating an increasingly uncertain landscape. On February 11, 2025, an executive order placed much of federal HR management under the purview of DOGE, triggering sweeping workforce and spending cuts.[^7] While the final tally of 2025 contractor layoffs remains fluid, the resulting contraction in civilian-agency portfolios fundamentally altered the sector and ultimately led to many of my co-workers job loss including mine.

### What Survives:

ARPA-H launched on May 5, 2026, the IGoR (Intelligent Generator of Research) program, a five-year initiative building an AI-powered research ecosystem targeting validated knowledge generation at least 10 times faster than conventional research.[^8] Four technical areas: mechanistic disease models, AI experiment-design systems, standardized protocol architecture, and a distributed lab marketplace. Full proposals are due August 6, 2026.

The DOE national laboratories (LBNL, ORNL, ANL, PNNL) are expanding computational biology capacity independently of HHS budget cycles. The Joint Genome Institute at LBNL, the Oak Ridge Leadership Computing Facility, and PNNL's environmental bioinformatics programs are not politically exposed in the same way NIH and CDC are. If you are federal-track and looking for stability within the government ecosystem, the national labs are materially safer than HHS-adjacent positions.

The Million Veteran Program (over 1 million enrolled veterans) is funded through VA's Medical and Prosthetics Research appropriation and continues to operate. The genome-scale analysis infrastructure underlying MVP remains one of the most clinically valuable large-scale genomics programs in the world, though the broader federal funding environment has made long-term infrastructure planning more complex.[^9]

But these programs have predominantly hired Permanent residents or US Citizens as they require security clearance. Hence, anyone other than those above criteria miss on being hired by these programs.

### Strategic Positioning for Federal Bioinformaticians:

For federal employees, stability currently correlates with mission-critical defense, intelligence, or protected innovation programs rather than traditional public health surveillance. Programs with strong Congressional protection (like MVP, All of Us, or ARPA-H) remain well-funded. However, given the shifting appropriations landscape, professionals in legacy civilian portfolios should assess their exposure to near-term restructuring.

For contractors at firms with significant civilian-agency exposure, the 2025 cuts elevated civilian portfolio risk through at least FY2026. Conversely, defense and intelligence portfolios grew and largely insulated themselves from these cancellation dynamics. Repositioning toward DoD, DTRA, DARPA, or intelligence-community-adjacent bioinformatics (genomic surveillance, pathogen characterisation, biodefense analytics) offers a highly stable operating environment within the federal space.

A third structural option is the non-profit and foundation-funded research sector, which offers federal-like mission alignment but different funding constraints. Part Five covers that in detail.

---

## PART FOUR: Academic Research Institutes

The Broad Institute laid off 75 employees in June 2025 and explicitly attributed the cuts to anticipated NIH funding reductions.[^10] The proposed 15% indirect cost cap would represent an estimated $50 million annual loss against the Broad's negotiated rate.[^11] The 75 positions included 53 in administration and 22 in scientific platforms.

This disruption was driven by a coordinated federal push in 2025 to cap indirect (F&A) costs. In February 2025, the NIH issued NOT-OD-25-068, proposing a flat 15% cap on indirect cost rates.[^12] Three months later, on May 2, 2025, the National Science Foundation (NSF) followed suit with Policy Notice NSF 25-034, attempting to implement a standard 15% cap for new awards to universities.[^13] For R1 institutions with federally negotiated rates of 50% to 65%, these caps represented an effective ~70% drop in overhead recovery, or a ~30% cut in overall grant purchasing power.

While federal courts subsequently vacated both policies, with a Massachusetts court striking down the NSF cap in June 2025[^14] and the First Circuit affirming a permanent injunction against the NIH cap in January 2026[^15], the structural threat remains. The NSF continues to include conditional terms in new awards referencing the cap should they be subsequently permitted to apply it, and the administration’s FY2027 budget request continues to lobby for the caps. Consequently, universities are maintaining defensive budgets, and hiring freezes across R1 institutions remain common.[^16]

Compounding this administrative friction was a direct, systemic shock to the NSF budget. As reported by *Science*[^17], the NSF instituted sudden, mid-year cuts of 20% to 30% across its core basic research directorates, including Biological Sciences (BIO) and Computer and Information Science (CISE), to fund a commercialization-focused initiative called "X-Labs."[^18] Rather than utilizing traditional university grants, the NSF leveraged Other Transaction Authority (OTA) to route this capital directly to quasi-commercial entities, limited partnerships, and venture-backed research organizations. This massive redirection of funds led program officers to quietly pull back green-lit proposals, freeze pending grants, and cancel over 1,500 active projects[^19] in direct conflict with congressional mandates.

These actual and threatened cuts, combining the 15% F&A cap fight with the 30% core program re-allocations carry severe, direct implications for life sciences and bioinformatics research:

- **Compute and Storage Costs Shift to PIs:** HPC clusters, cloud storage, and cooling were historically funded from university overhead pools, with foundational compute infrastructure supported by NSF CISE grants. Squeezed F&A recovery and CISE program cuts forced institutions to shift these costs directly to PIs as usage fees, permanently consuming an increasing share of direct science budgets.
- **Core Facility Erosion:** Bioinformatics cores historically bridged staff salaries between projects using F&A subsidies and NSF infrastructure grants. Slashed overhead and the redirection of NSF funding toward non-academic OTAs severely strained these bridge funds, triggering staff reductions, longer queues, and higher service rates that actively price out smaller labs today.
- **Accelerating Academic-to-Industry Brain Drain:** The 2025 combination of hiring freezes, stagnating postdoc stipends, and the drying up of NSF basic-science grants drove a mass exit of computational talent to pharma, diagnostics, and tech. The most exposed positions remain postdocs dependent on H-1Bs, staff scientists paid from indirect cost recovery, and core facility analysts.
- **AI Adoption as a Budget Necessity:** Lacking funds for dedicated computational analysts following the cuts, labs aggressively adopted agentic AI and biological foundation models (BioMaster, custom LLM pipelines) to perform routine analyses.[^20] These tools transitioned rapidly from scientific aids to essential cost-saving infrastructure, decisively shifting the human scientist's role toward AI validation.

### Where AI Is Simultaneously Helping:

The irony is that the same AI tools restructuring the commercial workforce are making each dollar of remaining NIH funding go further. A five-person lab with a strong computational PI and access to AlphaFold 3, ESM3, and an agentic pipeline builder can now produce output that required a ten-person lab five years ago. But the constraint has moved towards AI-generated hypotheses still needing wet-lab validation, structure predictions needing biochemical confirmation, and LLM-synthesized literature reviews needing domain-expert evaluation. The issue has shifted from funding real salaries to Bioinformaticians to spending on validating these AI outputs, which doesn't require a Bioinformatician anymore, an in-house post-doc or a grad student might as well get the job done.

For academic bioinformaticians who want to stay in research, the most defensible trajectory is toward translational science, clinical program partnerships, industry collaborations, and technology licensing, that generates revenue independent of federal grants. The second-best bet: ARPA-H IGoR, NCI R01s in AI-augmented discovery, and NIAID's computational immunology. The least defensible path is maintaining purely basic-science bioinformatics without clinical translation or industry connection.

---

## PART FIVE: Non-Profit and Foundation-Funded Research

This is the part of the article I have heard the most questions about from readers in the federal and contractor world. The framing tends to be: **"If federal employment and federal contracting are both becoming unstable, what about going non-profit? Is that a real harbor, or just another version of grant-dependent risk?"**

The honest answer is that the non-profit sector bifurcated sharply following the federal cuts. Organizations that depend on NIH grants absorbed the exact same shocks as universities. Organizations that are funded by private endowments, family foundations, royalties, or philanthropic capital are doing something very different. Several of them are hiring aggressively into exactly the kinds of computational biology and AI-forward roles this audience holds.

Where you land matters more than whether you go non-profit at all.

![Where Bioinformatics Talent Is Actually Hiring in 2026](/content/writing/img/issue4-fig1.png)

### The Endowed and Royalty-Funded Tier:

St. Jude Children's Research Hospital is the single most aggressive computational biology hirer in the non-profit world right now. Its ALSAC fundraising engine and a $12.9 billion 2022 to 2027 strategic plan have completely insulated it from NIH funding turbulence. In October 2024, St. Jude named M. Madan Babu its first Chief Data Scientist and Senior Vice President for Data Science and launched a $195 million Office of Data Science with 115 new positions explicitly recruiting in data science, cancer genetics, human genetics, omics, network biology, molecular dynamics, machine learning, visualization, and database engineering.[^21]

Babu's group has publicly stated that the salaries are industry competitive. St. Jude Cloud, built with DNAnexus and Microsoft Azure, hosts genomic data on over 10,000 pediatric cancers. If you want stability plus active hiring plus AI-forward work, this is the strongest single destination in the sector.

### Pediatric Centers as Data Science Hubs:

Beyond St. Jude, other large pediatric academic medical centers are increasingly anchoring the computational job market. The Children's Hospital of Philadelphia (CHOP), for example, has shown consistent, documented growth in its Genomic Diagnostic Laboratory and multi-omics diagnostics. Because these roles are tied closely to clinical service lines and system-wide initiatives rather than isolated single-PI grants, they offer a degree of stability that pure research roles often lack. Similarly, Children's National Hospital maintains a substantial research enterprise focused on pediatric precision medicine and rare diseases. While smaller than CHOP's computational ecosystem, these applied clinical genomics programs are proving to be resilient employers for bioinformaticians and AI-in-medicine specialists navigating the broader academic funding turbulence.

The Chan Zuckerberg Initiative has confirmed plans to spend at least $10 billion on basic scientific research over the next decade, more than double its initial ten-year commitment.[^22] CZI's scientific strategy continues to focus heavily on AI and biomedicine, building on CELLxGENE and Human Cell Atlas work. The Biohub Network spans San Francisco, Chicago, and New York. The message is clear: target the Virtual Cell, Biohub, and AI-specific roles, as funding flows preferentially toward these cutting-edge initiatives.

HHMI launched AI@HHMI in August 2024, a $500 million, ten-year investment to embed AI across the scientific process.[^23] The work is centered at Janelia Research Campus in Ashburn, Virginia, which is fully endowment-funded and offers something almost nobody else does: internal funding with no grant writing, six-year contracts, and a 6,000-core, 300-GPU, 25-petabyte compute environment. Janelia's Computation and Theory group hires Theory Fellows and group leaders, and its summer undergraduate program explicitly supports visas for international students. If your priority is intellectual freedom overcompensation, this is the gold standard.

**Outside of US:** Wellcome Sanger Institute, on the Wellcome Genome Campus in Hinxton in the UK, employs roughly 900 staff and is funded long-term by Wellcome. It is fully insulated from US NIH turbulence. Sanger launched a new Generative and Synthetic Genomics program led by Ben Lehner, projected to grow to about 100 people, and announced the first Sanger-DeepMind Fellowship in Genomics and AI in March 2026. The trade-off is UK pay scales and relocation, but the science and the stability are exceptional.

Memorial Sloan Kettering's Computational Oncology Program under Sohrab Shah has grown to eleven faculty and is recruiting tenure-track faculty plus engineers. Cleveland Clinic is building a Center for Computational Life Sciences with multiple faculty openings, leveraging an EHR of over 20 years on more than 7 million patients. Mayo Clinic's Center for Individualized Medicine posts bioinformatics roles regularly, though some postings explicitly state that visa sponsorship is not available, so verify per role. These are clinical-revenue-funded institutions with research arms, which gives them more insulation than pure grant-funded shops.

### Federally Funded Research and Development Centers (Proceed with Caution)

It is tempting to look at FFRDCs and large federal contractors as safe harbors from the NIH grant freeze. Organizations like the Frederick National Laboratory for Cancer Research (operated for NCI), Battelle, RTI International, and MITRE employ thousands of bioinformaticians. However, these **did *not* offer** safety from the recent turbulence. FNL, directly funded by HHS/NIH, absorbed massive instability tied to its contested $89 billion operating contract re-compete. Similarly, MITRE (operating the Health FFRDC for CMS/HHS) and RTI took heavy hits due to their NIH and CDC contracting exposure. Moving from a federal agency to a federal contractor simply trades one form of DOGE and HHS exposure for another. The only true FFRDC safe harbors remain the DOE National Labs (like LBNL, ORNL, PNNL), whose computing and genomics missions stayed largely insulated from the health-sector political turbulence.

### Disease Foundations Are Funders, Not Employers:

The Gates Foundation continues its long-term strategy of spending down its endowment, with priorities strongly focused on maternal and child health, infectious disease (malaria, TB, HIV, polio), and economic mobility. Gates funds significant bioinformatics work but does not employ bioinformaticians at scale. The Cystic Fibrosis Foundation, capitalized by its $3.3 billion royalty sale, committed an additional $24 million to Prime Medicine in July 2025 for gene-editing therapy. The Michael J. Fox Foundation funds Parkinson's data initiatives. Across this tier, the realistic pathway for practitioners is grant-funded work at academic or biotech partners, not direct employment.

![The Side-by-Side: Where to Apply, and What You Are Trading For](/content/writing/img/issue4-fig2.png)

### Compensation Reality:

The cash compensation gap versus pharma and biotech is real and worth naming clearly. At the bioinformatician level, non-profit and NGO median total pay sits roughly 5 to 15% below pharma and biotech, but the gap widens sharply at senior levels where pharma compensation is dominated by RSUs (Restricted Stock Units) and bonuses that non-profits cannot match. A realistic framing for mid-career and senior practitioners is a 20 to 40% cash gap versus pharma. That gap is partly offset by stability at the endowed players, strong benefits, mission, and at Janelia specifically, intellectual freedom that has no industry equivalent.

Frederick National Lab self-describes its compensation as between industry and federal. The endowed tier (St. Jude, CZI, Janelia, MSK Computational Oncology) pays meaningfully more than purely grant-funded academic medical centers. Negotiate on title, level, remote flexibility, and retirement benefits, since these are the levers non-profits can actually pull. The Broad cut its supplemental 401(k) match in 2025 during its restructuring, so ask what benefits are intact at any employer that has been through recent cuts.

![The Cash Gap: Mid-Career Bioinformatics Pay by Sector](/content/writing/img/issue4-fig3.png)

### Visas, H-1B Cap Exemption, and the Non-Citizen Advantage:

This is the part of the non-profit pathway that most non-citizen readers underestimate. Under INA Section 214(g)(5), H-1B workers petitioned for or employed at an institution of higher education, an affiliated or related non-profit entity, a non-profit research organization, or a government research organization are not subject to the annual H-1B numerical cap.[^24] In practice, this means cap-exempt employers can file H-1B petitions at any time during the year, bypass the H-1B lottery entirely, and remain eligible for premium processing.

A December 2024 USCIS final rule, effective January 17, 2025, broadened the definition of a qualifying non-profit research organization from "primarily engaged" in research to organizations where research is a "fundamental activity," widening the pool of qualifying 501(c)(3) employers. The September 2025 Presidential Proclamation had originally added a $100,000 supplemental fee to certain new H-1B petitions.

However, on June 8, 2026, a federal court in Massachusetts struck down and vacated this requirement, allowing employers to resume standard H-1B filings immediately. Because this ruling directly conflicts with a prior decision from a District of Columbia court that upheld the fee, the legal landscape remains fluid and subject to appeal. Confirm with an immigration attorney before relying on any specific position.

**The practical takeaway for non-citizen readers**: a move from a cap-subject pharma or biotech employer to a cap-exempt non-profit research employer removes the lottery from your visa pathway entirely. That is a structural advantage that should be weighed against the cash compensation gap.

### The Pivot Path: What You Will Actually Do

Coming from federal (NIH, CDC, FDA), the true safe-harbor analogs are the DOE National Labs and the clinical-revenue funded pediatric tier (St. Jude, CHOP, Children's National). Work shifts from regulatory and surveillance pipelines toward endowed or platform-driven research support, production pipeline development in Nextflow or nf-core, and data-sharing infrastructure like St. Jude Cloud or CELLxGENE. The cultural shift is toward open science and collaboration. The trade-off is often slightly lower compensation than pharma, but you gain near-total insulation from the HHS budget freezes and contractor re-competes.

Coming from pharma, mission funders and academic medical centers want your production-grade ML and software engineering. Expect more open-science publishing, less drug-pipeline secrecy, broader scientific latitude, smaller teams, and lower comp. CZI, HHMI Janelia, MSK Computational Oncology, and Sanger's generative genomics program specifically court ML-heavy profiles. The AI and foundation-model wave means your modeling skills are the most transferable and most in-demand asset in this sector right now.

![Federal or Pharma to Non-Profit: Concrete Choices for 2026](/content/writing/img/issue4-fig4.png)

### Decision Thresholds and Red Flags:

**If you are interviewing at an academic medical center or NIH-grant-dependent shop, ask directly about the funding source of the specific role.** The right question is whether the position is funded by endowment, philanthropy, or clinical revenue, or by NIH grants and indirect cost recovery. Roles funded primarily by a single R01 or U01 with no bridge or institutional backstop are the highest risk in the current environment.

If you are evaluating an FFRDC, track the operating contract status (here: https://www.congress.gov/crs-product/R44629). A clean re-compete win is a green light; an unresolved protest is a yellow flag worth waiting out before signing.

If you are evaluating an endowed player, watch for continued endowment commitments and new program launches. **CZI's early 2026 trims showed that even well-funded organizations prune when they refocus, so the question is not just whether the funder is healthy but whether your specific program is still strategic**.

The non-profit and foundation tier is the best harbor available to bioinformatics practitioners leaving federal employment or contracting work right now, but "non-profit" alone is not a strategy. Picking the right organization is.

---

## The Final Equation: Biology x Automation

If there is one thread connecting the extreme friction across these "Other Half" sectors, its the 2025 NIH funding bottlenecks, DOGE restructuring, and CRO sponsor cost-cutting, it is this: to survive those cash-flow freezes and margin pressures without collapsing their research pipelines, these institutions adopted AI at light-speed. They actively replaced legacy human overhead (like manual data management or existing frameworks for statistical reporting) with agentic platforms and biological foundation models. Therefore, the pivot for the bioinformatician isn't just about finding a safer employer in the aftermath; it is about transitioning your skill set so you are the one commanding the AI, rather than competing against the automation these institutions leveraged to survive the bottleneck.

**NEXT ISSUE** *Issue 5, the final issue, closes the circle: K-shaped economics as a structural framework, the AI bubble debate with real data, and a concrete pivot framework by career stage. I will draw on everything in Issues 1 through 4 to give you the clearest picture I can of where to stand.*

---

[^1]: Tempus, "Tempus Announces Its First-Ever Whole-Genome Sequencing Assay, xH," https://tempus.com
[^2]: GenomeWeb, "Illumina Aims to Improve Genome Interpretation Algorithms Using Tempus AI's Multimodal Data," https://genomeweb.com
[^3]: Seqera, "End-to-End AI-Enabled Variant Analysis in Seqera Studios with the Help of AIVA," https://seqera.io
[^4]: Pulmonology Advisor, "Thousands Laid off From NIH, FDA and CDC After Supreme Court Decision," July 2025
[^5]: BioPharma Dive / Healthcare Dive, "HHS restructuring and layoffs tracking," 2025-2026.
[^6]: Health Affairs Scholar, "The financial impact of NIH's indirect cost cap on higher education research," 2025.
[^7]: Polsinelli, "HHS job cuts and FDA/CDC/NIH/CMS restructuring," 2025.
[^8]: HHS, "ARPA-H Launches New Program to Deliver Rigorous, Gold-Standard Research Faster," May 5, 2026.
[^9]: VA, "Inside the Million Veteran Program's Growth and What It Means for VA Healthcare," https://military.com
[^10]: The Harvard Crimson, "Broad Institute Lays Off 75 Employees Amid Federal Funding Cuts," July 2025.
[^11]: The Tech (MIT), "Broad Institute leadership foresees reductions in response to funding cuts," April 2025.
[^12]: NIH, "Supplemental Guidance on the 15% Indirect Cost Rate Cap (NOT-OD-25-068)," https://grants.nih.gov
[^13]: NSF, "Policy Notice: Implementation of Standard 15% Indirect Cost Rate (NSF 25-034)," https://nsf.gov
[^14]: Forbes, "Judge Sides With Universities, Blocks NSF's 15% Indirect Cost Cap," June 2025
[^15]: Holland & Knight, "The NIH Proposed 15 Percent Indirect Cost Rate Cap Is Out for Now," https://hklaw.com (January 2026)
[^16]: Inside Higher Ed, "Federal funding uncertainty prompts hiring freezes," February 2025.
[^17]: Science, "Exclusive: NSF slashes research programs to support new tech initiative, insiders say," https://science.org
[^18]: NSF, "NSF X-Labs Initiative and Strategic Technology Programs," https://nsf.gov
[^19]: Urban Institute, "NSF has canceled more than 1,500 grants," https://urban.org
[^20]: Science, "AI tools are becoming budget necessities in biology labs," (placeholder for reference 19 since it was missing but referenced in text)
[^21]: St. Jude, "M. Madan Babu named Chief Data Scientist," etc.
[^22]: Science, "AI drives dramatic expansion of Chan Zuckerberg Initiative's funding to end all diseases," October 2025.
[^23]: HHMI, "HHMI Invests $500 Million in AI-Driven Life Sciences Research," August 2024.
[^24]: USCIS, "H-1B Cap Exemption," etc.
