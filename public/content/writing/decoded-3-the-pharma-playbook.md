**SERIES CONTEXT** In Issue 1, I laid out the macro environment that is geopolitics, immigration, and federal funding pressures. Issue 2 covered the energy constraint on the AI build-out. Now we get to the heart of it: how the work of computational biology is actually being restructured inside pharma, and what the ‘pharma waits for startups to prove it, then acquires’ pattern means for your career.

> **TL;DR** — Four core realities are reshaping the corporate landscape of computational biology.
>
> - Big Pharma is centralizing around massive NVIDIA-backed infrastructure stacks to run “scientist-in-the-loop” platforms.
> - Mid-2024/2025 layoffs (including at Novo Nordisk, Recursion, etc.) are strategically targeting general analysts and commercial roles while preserving clinical validation and AI systems engineering.
> - AI-native biotechs function as capital-efficient R&D engines designed for pharma acquisition rather than independent scale.
> - Career durability belongs to “translators” bridging foundation model capability and regulatory/clinical liability.

---

During the most recent chapter of my career, I entered a planned professional transition after moving on from Booz Allen Hamilton, while also adjusting to life with a newborn and navigating a change in visa status from H-1B to H-4. During that period, I continued independent study in clinical AI, variant interpretation, and benchmarking methods.

In that context, I had informal academic discussions with a former graduate-school colleague who was developing AIVA ([chat.aivaportal.com](https://chat.aivaportal.com)), an agentic variant interpretation platform. Those discussions focused on evaluation concepts, including variant classification metrics such as F1 score, precision, and recall against ClinVar and ACMG-aligned reference standards, as well as variant-prioritisation measures such as Recall@K and gene-ranking quality. They also touched on the kinds of clinical reasoning constraints that any responsible variant interpretation system must respect.

Two important insights emerged from reflecting on that work and the broader direction of the field. In my view, they capture the real state of AI in clinical bioinformatics, beyond both the hype and the dismissal.

The first insight was speed. Variant interpretation, which previously required clinical bioinformaticians to spend weeks reviewing ClinVar, HGMD, literature, population databases, and functional evidence, could be compressed into minutes. This was not because AI replaced clinical judgement. Rather, the system brought annotation databases, filtering logic, and evidence synthesis into a single reasoning workflow. As a result, the bottleneck shifted from data retrieval to interpretation.

The second insight was the potential for VUS reclassification. An LLM-powered literature search and web-integration layer was able to identify published functional evidence, case reports, and population-level data that existed in the literature but had not been systematically connected to specific variants in a patient record. Variants of unknown significance, often the most frustrating category in clinical genomics because they leave families without clear answers, could be reclassified as benign or pathogenic when the relevant evidence was properly aggregated. In some cases, diagnoses became possible using the same sequencing data that had previously produced no clear result.

This is what I mean by realistic AI in clinical bioinformatics. It is not the claim that AI will replace everything, and it is not merely autocomplete applied to medicine. It is something more specific and more useful: AI can reduce the latency of information retrieval and evidence synthesis, unlocking clinical value that was already present in the data. That is real, and the pharmaceutical industry has recognized it.

---

## PART ONE: How Big Pharma Is Restructuring

### The Infrastructure Stack:

In Issue 2, we established that the massive energy requirements of biological foundation models create a structural moat. Here in Issue 3, we see exactly who is sitting inside that moat: Big Pharma. Because compute is now the ultimate bottleneck, Pharma is centralizing its infrastructure.

Five strategic partnerships now define what this infrastructure looks like at scale, and they all run through NVIDIA. Alongside these custom hardware pods, Big Pharma is building enterprise-wide LLM and generative AI stacks: Merck partnered with Google Cloud for $1 billion in April 2026 to deploy Gemini Enterprise [^25], Novo Nordisk partnered with OpenAI in April 2026 [^26], and Bristol Myers Squibb signed a comprehensive agreement with Anthropic to deploy Claude in May 2026 [^27].

Eli Lilly and NVIDIA announced a co-innovation lab in January 2026, representing an investment of up to $1 billion over five years [^1]. This collaboration follows Lilly’s October 2025 acquisition of a DGX SuperPOD equipped with 1,016 Blackwell Ultra GPUs.

**Technical Primer: DGX SuperPOD** | A turn-key supercomputing cluster designed by NVIDIA that clusters multiple high-performance GPU systems using high-speed networking to function as a single unified supercomputer for training massive parallel workloads.

The architecture utilizes a scientist-in-the-loop framework, in which generative models propose hypotheses that are subsequently tested by automated wet-lab systems, creating a continuous data feedback loop to update the models. NVIDIA CEO Jensen Huang characterized the initiative as a blueprint for the future of drug discovery [^2].

Genentech and NVIDIA developed a lab-in-a-loop platform, establishing a multi-year generative AI collaboration through Genentech’s Research and Early Development computational sciences unit [^3]. This system compresses traditional hypothesis-test-analyze cycles from months to days. The computational sciences group, led by James Marioni, comprises over 400 specialists.

Novo Nordisk is a multi-year customer of Gefion, Denmark’s national AI supercomputer [^4][^5]. Powered by 1,528 NVIDIA H100 GPUs, Gefion was launched in October 2024 and ranks among the world’s most powerful supercomputers. Novo Nordisk utilizes this system to train large-scale genomic and protein models that exceed the capacity of its internal infrastructure.

Sanofi co-developed its Plai platform with Aily Labs, launching the tool in June 2023 [^6]. The system now supports over 15,000 daily users and runs 300 AI models. Plai serves as an executive decision system that guides research portfolio allocation, clinical operations, and commercial strategy. Sanofi CEO Paul Hudson has committed the company to extensive AI integration across the entire corporate value chain.

### What Is Being Automated, Augmented, and Left Human:

To understand the true impact of AI on computational biology careers, we need to separate task volume from career risk. The table provides the career-risk perspective by showing how automation changes the human role, and the chart below shows the task-volume perspective: the number of discrete technical operations, such as target identification or lead generation, that AI systems can now perform.

Even when AI automates a large portion of a task, the computational biologist is rarely removed from the process. Instead, the role is reshaped. Human value shifts toward biological interpretation, downstream validation, complex optimization, experimental design, and regulatory oversight.

![Pharma bioinformatics functions: AI status (May 2026) and career read](/content/writing/img/issue3-fig1.png)

![How AI Is Reshaping Big Pharma Bioinformatics Functions](/content/writing/img/issue3-fig2.png)

A clear boundary exists between automation and human oversight. Functions that directly impact regulatory submissions or carry clinical liability remain strictly human-in-the-loop. While AI accelerates information synthesis, human scientists must validate and sign off on all data submitted to regulatory agencies or integrated into clinical pathways.

### The Layoffs: What Is Actually Getting Cut

The 22,000 pharmaceutical industry layoffs in 2025 followed a clear strategic pattern [^7]. Across restructurings at Novo Nordisk (9,000 cuts), Bayer, BMS, Merck, Pfizer, Takeda, and GSK [^8], the eliminated roles clustered in four areas:

1. Commercial and sales infrastructure replaced by digital platforms
2. Legacy manufacturing and quality control sites
3. Early-stage research programs that were de-prioritized and
4. Generic data analytics roles absorbed into centralized platforms.

Conversely, companies preserved or expanded clinical bioinformatics roles with regulatory responsibilities, computational oncology and immunology positions, and AI systems validation functions.

---

## PART TWO: The AI-Native Biotech Landscape

AI-native biotechnology companies effectively run controlled discovery experiments on behalf of larger pharmaceutical organizations.

Xaira Therapeutics launched in April 2024 with $1 billion in committed funding, representing ARCH Venture Partners’ largest initial commitment in 39 years [^9][^10]. Led by CEO Marc Tessier-Lavigne, the company utilizes its proprietary X-Cell foundation model, trained on 25.6 million cells, to target inflammatory and immunological diseases. The company designs novel proteins without evolutionary precedent by applying generative AI to target identification, molecular design, and manufacturing.

EvolutionaryScale launched in June 2024 with a $142 million seed round [^11]. Their ESM3 model, containing 98 billion parameters and trained on 2.78 billion protein sequences using over 10²⁴ FLOPs, was reported in science to simulate the equivalent of 500 million years of evolution [^12]. The model is accessible through major cloud providers and NVIDIA’s BioNeMo platform. While the scale of this computational model is verified, its long-term impact on drug discovery timelines remains under evaluation.

Isomorphic Labs completed two major strategic agreements in January 2024: an alliance with Eli Lilly valued at up to $1.7 billion in milestone payments, and a partnership with Novartis valued at up to $1.2 billion [^13][^14]. The platform leverages AlphaFold 3 and Gemini-integrated molecular design to advance proprietary oncology and immunology assets toward Phase I clinical trials.

Recursion and Exscientia completed their merger in November 2024 at a closing value of approximately $629 million [^15]. The combined entity began operations with approximately 800 employees and $850 million in cash. It maintains partnerships with Roche-Genentech [^16][^17], Bayer, Sanofi, and BMS. In June 2025, Recursion reduced its workforce by 20% following the de-prioritization of three clinical programs [^19]. This adjustment illustrates the persistent gap between computational screening efficiency and clinical validation outcomes.

Takeda and Iambic Therapeutics completed a $1.7 billion partnership agreement in February 2026 [^18]. Iambic’s NeuralPLexer model for protein-ligand structure prediction guides their joint oncology and immunology programs. Their lead candidate, a HER2 tyrosine kinase inhibitor, demonstrated clinical safety and anti-tumor activity at the ESMO 2025 congress. Additionally, BioNTech acquired InstaDeep in 2023 for approximately $549 million, integrating 290 computational specialists into its oncology pipeline development [^20].

---

## PART THREE: The ‘Pharma Waits, Then Acquires’ Thesis

Recent transactions demonstrate a clear industrial pattern rather than an unproven hypothesis.

![Pharma–AI Biotech Partnerships & Acquisitions: Deal Value Comparison](/content/writing/img/issue3-fig3.png)

This pattern operates in three distinct phases. In the first phase, pharmaceutical companies secure platform optionality by signing milestone-based partnerships with AI-native biotechs, shifting early clinical validation risk to the startup. This trend began with major partnerships like Roche/Recursion ($12B) and Sanofi/Recursion ($5.2B), and has accelerated through early 2026. Recent agreements include Eli Lilly’s partnership with Profluent ($2.25B) in April 2026 [^21], Incyte’s expanded alliance with Genesis Molecular AI ($1B) in May 2026 [^22], and Servier’s dual agreements with Insilico Medicine and Iktos ($2B) in January 2026 [^23].

In the second phase, as clinical milestones are met, pharmaceutical companies either expand their alliances or acquire the platforms, as demonstrated by BioNTech’s acquisition of InstaDeep ($549M), Recursion’s merger with Exscientia ($629M), and Eli Lilly’s expansion of its Insilico Medicine alliance to up to $2.75B in March 2026 [^24].

In the third phase, companies internalize these capabilities by building proprietary infrastructure, exemplified by Eli Lilly’s co-innovation lab, Genentech’s lab-in-a-loop, and Amgen’s deCODE supercomputing stack.

![Pharma's Deliberate Strategy: Let Startups Prove It, Then Partner or Acquire](/content/writing/img/issue3-fig4.png)

The economics of drug discovery dictate that AI-native biotechs are structured as acquisition targets rather than independent pharmaceutical companies. Successful acquisition candidates must demonstrate validated wet-lab data feedback loops, proprietary foundation models that are costly to replicate, and clinical-stage assets that validate the platform’s utility. In-silico Medicine’s Phase 2a trial for rentosertib, which will be discussed in Issue 5, exemplifies this model by producing a clear clinical signal from a molecule designed entirely using AI.

For computational biologists, employment at an AI-native biotech represents a path into the pharmaceutical sector rather than a distinct career trajectory. During acquisitions, organizations typically retain core architects and clinical translation specialists while consolidating redundant administrative and operational roles.

### What the Stubbornly Human Work Tells Us: Your Next Move

**Traditional bioinformatics engineering remains essential.** Organizations require senior engineers to manage cloud infrastructure, optimize data storage, and maintain production-grade Nextflow or Snakemake pipelines. However, the career ceiling for pure execution roles is capping. Computational biologists who spend most of their careers running standardized pipelines are increasingly competing not only with AI agent systems, but also with global capability centers that can centralize analytics, statistical programming, data science, clinical operations, and AI engineering at scale

**Just in: May 26th, 2026**: Regeneron’s recent announcement of a Global Capability Centre in Hyderabad is a clear example of this shift, with the site expected to support functions including data management, statistical programming, digital technology, artificial intelligence, clinical trial operations, insights and analytics, and commercial operations.

The most durable careers in computational biology will belong to professionals who can build, evaluate, and deploy specialized biological AI systems. Their value will not come from writing routine code wrappers around existing tools, but from converting probabilistic model outputs into reliable biological workflows, validated decision systems, and regulatory-ready evidence packages.

Across pharmaceutical research and development, model evaluation, clinical validation, and cross-functional scientific translation will remain human-led responsibilities. These activities carry direct regulatory, clinical, and operational risk, including FDA review, audit exposure, and potential clinical holds. For that reason, accountability cannot be delegated entirely to an algorithm. A qualified human scientist must remain responsible for the final interpretation, validation, and decision-making.

**To maintain long-term career durability, computational biologists should develop three core competencies:**

1. **Model evaluation:** Building rigorous frameworks to benchmark foundation-model outputs against empirical assays, spatial transcriptomics, perturbation screens, clinical datasets, and established biological ground truth.
2. **Multi-objective optimization:** Guiding generative models toward biologically useful outputs that satisfy competing constraints, including binding affinity, specificity, off-target toxicity, manufacturability, pharmacokinetics, and developability.
3. **Regulatory translation:** Converting probabilistic AI outputs into deterministic evidence packages that can withstand clinical, regulatory, and quality-system review. This includes documenting model limitations, validation criteria, audit trails, safety thresholds, and compliance benchmarks.

**A fourth competency is also becoming essential:**

1. **Biological systems integration:** Connecting model outputs to real disease biology, experimental design, pathway context, patient stratification, and therapeutic mechanism. This is where computational biologists create value beyond automation by ensuring that AI-generated predictions are biologically meaningful, testable, and clinically relevant.

Computational biologists who combine this technical foundation with deep domain expertise in areas such as oncology, immunology, rare disease, neuroscience, or infectious disease will be positioned for long-term career resilience. Their advantage will come from their ability to evaluate AI systems scientifically, translate outputs into validated biological workflows, and guide cross-functional teams from prediction to experiment to clinical decision-making.

**NEXT ISSUE** *Issue 4 will cover clinical diagnostics, contract research organizations (CROs), federal contracting, and academia. These sectors face distinct structural pressures and offer unique career trajectories. For professionals in these domains, the next installment is essential reading.*

---

[^1]: Drug Discovery Trends, “Lilly and NVIDIA unveil $1B co-innovation lab in SF,” https://drugdiscoverytrends.com, January 2026
[^2]: NVIDIA Newsroom, “CEOs of NVIDIA and Lilly Share ‘Blueprint for What Is Possible’ in AI and Drug Discovery,” https://blogs.nvidia.com, January 2026
[^3]: RamaOnHealthcare, “Genentech, NVIDIA partner on ‘lab-in-a-loop’ AI platform,” https://ramaonhealthcare.com
[^4]: NVIDIA Blog, “Denmark Launches Leading Sovereign AI Supercomputer,” https://blogs.nvidia.com
[^5]: FierceBiotech, “‘The opportunities are immense’: Novo Nordisk signs up to use Danish supercomputer,” https://fiercebiotech.com
[^6]: IntuitionLabs, “AI at Scale in Pharma: Sanofi’s AI Strategy Explained,” https://intuitionlabs.ai
[^7]: FiercePharma, “Large pharma companies reduced headcounts by more than 22K in 2025,” https://fiercepharma.com, April 2026
[^8]: FiercePharma, “Novo Nordisk to lay off 9,000 workers,” https://fiercepharma.com, September 2025
[^9]: FierceBiotech, “New AI drug discovery powerhouse Xaira rises with $1B in funding,” https://fiercebiotech.com
[^10]: ACS C&EN, “Backed by $1 billion, Xaira Therapeutics is readying AI-generated drugs,” https://cen.acs.org
[^11]: Amazon UK Press Centre, “EvolutionaryScale Launches with ESM3: A Milestone AI Model for Biology,” https://aboutamazon.com, June 2024
[^12]: Hayes et al., “Simulating 500 million years of evolution with a language model,” Science 385, 2024. DOI: 10.1126/science.ads0018
[^13]: Fortune, “Alphabet’s Isomorphic Labs to collaborate with Novartis, Lilly on AI-driven drug discovery,” January 2024
[^14]: FierceBiotech, “Alphabet’s Isomorphic stacks two new deals with Lilly, Novartis worth nearly $3B,” https://fiercebiotech.com
[^15]: Drug Discovery Trends, “Recursion-Exscientia merger consolidates AI in drug discovery field,” https://drugdiscoverytrends.com
[^16]: Recursion, “Recursion Announces Transformational Collaboration with Roche and Genentech,” https://ir.recursion.com, 2021
[^17]: Inside Precision Medicine, “Roche, Genentech Commit up to $12B to Recursion for AI-Driven Drug Discovery,” https://insideprecisionmedicine.com
[^18]: FierceBiotech, “Takeda inks $1.7B AI drug discovery deal with Iambic Therapeutics,” https://fiercebiotech.com, February 2026
[^19]: GEN, “Recursion Eliminating 20% of Workforce, Citing Pipeline Pruning and Capital Markets,” https://genengnews.com
[^20]: Pharmaceutical Commerce, “BioNTech Finalizes Acquisition of InstaDeep for $549M,” https://pharmaceuticalcommerce.com
[^21]: BioSpace, “Lilly Inks Deal With Profluent to Use AI for Recombinase Design,” April 2026
[^22]: FierceBiotech, “Incyte Expands Partnership with Genesis Molecular AI in B+ Deal,” May 2026
[^23]: Endpoints News, “Servier Bets Big on AI with Dual Insilico and Iktos Partnerships,” January 2026
[^24]: FierceBiotech, “Eli Lilly expands AI drug discovery partnership with Insilico Medicine to up to $2.75B,” https://fiercebiotech.com, March 2026
[^25]: BioSpace, “Merck and Google Cloud Form $1B Multi-Year Generative AI Partnership,” https://biospace.com, April 2026
[^26]: OpenAI Press, “Novo Nordisk Partners with OpenAI to Accelerate Diabetes and Obesity Drug Discovery,” https://openai.com, April 2026
[^27]: Anthropic News, “Bristol Myers Squibb and Anthropic Announce Enterprise-Wide AI Collaboration,” https://anthropic.com, May 2026
