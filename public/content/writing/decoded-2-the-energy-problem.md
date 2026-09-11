**SERIES CONTEXT** In Issue 1, I mapped the geopolitical, immigration, and federal funding pressures reshaping the bioinformatics operating environment. This issue goes one layer deeper into the physical infrastructure that will determine whether the AI buildout can actually deliver what it promises.

> **TL;DR** — Four physical and economic realities are creating an immediate bottleneck for AI.
> - The biggest constraint is no longer algorithms or data, but electricity as global data centers are on track to double their 415 TWh consumption by 2030, with GPUs accounting for only 40% of the massive facility power draw.
> - A severe physical supply chain failure has stretched transformer lead times to 3–5 years, delaying or cancelling nearly half of planned 2026 data center builds.
> - In response, tech giants are aggressively locking up the energy supply by signing 20-year nuclear power purchase agreements and acquiring energy developers outright.
> - For bioinformatics teams, this physical reality translates directly into severe GPU pricing volatility and the rise of a critical new premium skillset: Compute Sovereignty.

---

*There is a story playing out right now that most people in AI and data infrastructure are underestimating, but it may be the single most important constraint on the tools we use over the next decade. It has nothing to do with model architectures, training tricks, or bigger datasets, it's about Power-specifically, whether energy grids can physically supply the energy that large-scale AI will demand in the near future.*

*I want to be direct and upfront, I am not an Infrastructure Engineer, but as someone who has spent the better part of a decade running large-scale genomics workflows on AWS and HPC systems building pipelines that depend on cloud computing, this story affects me and everyone in this field. The question of whether GPU capacity is available, how it is priced, whether it's stable or not is not an abstract concern anymore but a practical question that will determine what we can build and at what cost as Bioinformatics and Computational Biologists.*

*When the laws of silicon physics and grid infrastructure finally hit their limits (Von Neumann bottleneck), computer science doesn’t look inward to more clever abstractions; it looks back to biology. Today’s hyperscalers are trying to scale artificial intelligence by wiring together hundreds of thousands of power-hungry GPUs, even colocated with massive new power sources, while the human brain performs flexible, general-purpose reasoning on roughly 20 watts of power, less than a standard lightbulb. Even though brain can’t synchronously update trillions of explicit parameters like an Nvidia GPU cluster, it is thermodynamically efficient and is the most credible blueprint we have for the future of AI hardware.*

*This is why biologists and bioinformaticians are not just passengers in the AI revolution but are sitting on the design patterns that can make it physically sustainable. From brain-inspired, event-driven chips to memory architectures that mirror how neurons and synapses manage information, biological systems already solve the energy problem that AI is now bumping into.*

*So let's Dive in...*

---

## PART ONE: The Scale of the Problem

The International Energy Agency’s (IEA) April 2025 *Energy and AI* report, the most authoritative source available on this topic, establishes the baseline: global data centers consumed approximately 415 terawatt-hours (TWh) of electricity in 2024, representing roughly 1.5% of total global electricity consumption. By 2030, the IEA projects this will more than double to approximately 945 TWh in its base case, growing at around 12% annually which is more than three times the rate of total global electricity demand growth[^1].

**Compute Context: What is a Terawatt-Hour (TWh)?** A terawatt-hour is 1 billion kilowatt-hours (kWh). For context, running a single standard high-performance AI server GPU (consuming ~400W) continuously for a full year takes about 3,500 kWh (3.5 MWh). One TWh is enough to power roughly 285,000 such GPUs running non-stop for a full year.

To put this in scale: by 2030, U.S. data centers alone are on course to account for almost half of the growth in total U.S. electricity demand. They will consume more electricity than aluminum smelting, steel production, cement manufacturing, and chemicals combined[^2]. The IEA has noted that global data center consumption will reach approximately 945 TWh by 2030, that is slightly exceeding Japan’s entire national electricity consumption today[^3].

The United States accounts for roughly 45% of global data center consumption today (about 187 TWh in 2024), and that share is set to rise. Geographic concentration compounds the problem: nearly half of U.S. data center capacity sits in just five regional clusters (Northern Virginia, Dallas, Phoenix, Chicago, and Silicon Valley). In Northern Virginia alone, data centers already account for roughly 25% of the regional grid’s total electrical load.

This is not a background story but an operating environment for every cloud-based genomics workload, every API call to a foundation model, and every GPU-hour your team purchases. The physics of electricity supply is now a constraint on what AI (or biological AI) can do and what it will cost.

![Data Center Electricity Consumption: 2017–2030 (TWh)](/content/writing/img/issue2-fig1.png)

---

## PART TWO: The Physical Bottlenecks

The conventional AI narrative focuses on chips i.e, Nvidia’s Blackwell GPUs, TSMC’s advanced packaging, export controls. The chip bottleneck is real but it is being actively addressed by semiconductor manufacturers. However, grid bottleneck is not and it has three components, each of which operates on timescales that dwarf the pace of AI development.

### What the Power Actually Goes To:

Before covering what blocks delivery of power to data centers, it is important to be precise about what that power actually does once it arrives. Most people assume GPU compute is the dominant draw but it is not. What I uncovered during the process of reading and accumulating evidence blew my mind.

Epoch AI’s December 2025 analysis of a frontier GB200-class data center found that GPUs account for only about 40% of total facility power. Total server power runs at 1.53 times GPU power alone, because the CPUs, high-bandwidth memory, and NVLink interconnects inside each server add significant overhead. IT infrastructure, including networking switches, storage, and inter-server fabric, adds another 14%. Cooling, lighting, and power conversion at the facility level add a further 40% on top of that. The compounded result: for every watt your GPUs consume, roughly 2.44 watts come out of the grid[^18].

**This matters for two reasons.**

- NVIDIA's newest AI server racks generate between 120 and 140 kilowatts of heat per rack that is roughly equivalent to powering 40–50 homes simultaneously, all crammed into a cabinet the size of a wardrobe. At that level, air conditioning physically cannot remove heat fast enough, so NVIDIA has made water-based (liquid) cooling a hard requirement, not an option. The payoff is tremendous: liquid cooling is so much more efficient that it frees up the chips to run at full power without throttling, delivering about 17% more sustained performance from the same hardware.
- Data centers don't just consume the power the chips need, they consume far more. For every watt spent on actual AI computation, the facility draws 2.44 watts total from the grid. That 2.44x gap pays for cooling systems, power distribution, lighting, and backup infrastructure. The implication is powerful in both directions: a data center running 100 megawatts of GPUs is actually pulling 244 megawatts from the utility. But flip that around, if engineers can make the chips 20% more efficient (as DeepSeek's work suggested was possible), the total facility draw doesn't drop by 20%. It drops by nearly 49 megawatts, because the savings compound across that entire 2.44x multiplier. **This was the reason NVIDIA lost $589B when DeepSeek R1 released[^13][^14].**

![Frontier AI Data Center Power Breakdown: GPUs Are Only Part of the Picture](/content/writing/img/issue2-fig2.png)

### Transformers:

Large power transformers: the heavy substation equipment that steps electrical voltage up and down so power can travel safely across the grid, are in critical shortage. The U.S. Department of Energy’s (DOE) July 2024 *Report to Congress on Large Power Transformer Resilience* documents that manufacturers are commonly quoting lead times of 36 months, with maximum lead times reaching 60 months (5 years) for the largest units[^4]. A federal advisory report from June 2024 quantifies the deterioration: average lead times rose from approximately 50 weeks in 2021 to 120 weeks by 2024, with large generator step-up transformers ranging from 80 to 210 weeks[^5]. Over 80% of transformers above 60 MVA are imported because domestic manufacturing capacity is insufficient.

*Bottom Line: You cannot build a data center without them. And you cannot order one and receive it in less than three years.*

A new constraint sharpened this problem in 2026. Sightline Climate’s April 2026 Data Center Outlook estimates that 30 to 50% of large US data centers scheduled to come online in 2026 will be delayed or cancelled. Of the 12 to 16 gigawatts of US capacity planned for the year, only approximately 5 gigawatts is actually under construction in various parts of the country (some data centers are even contested, e.g: Stratos AI data center (Utah)). A significant part of the reason: the US imported more than 8,000 high-power transformers from China in the first ten months of 2025, up from fewer than 1,500 in all of 2022. Tariffs and supply chain disruption have hit precisely the component that cannot be substituted or rushed[^19].

![Grid Infrastructure Bottleneck: Transformer Lead Times (Weeks)](/content/writing/img/issue2-fig3.png)

### Grid Interconnection:

Lawrence Berkeley National Laboratory’s *Queued Up: 2025 Edition* documents that the median time from an interconnection request to commercial operation has doubled since the early 2000s - from under two years for projects built between 2000 and 2007 to over four years for the 2018–2024 cohort[^6]. Approximately 1,400 gigawatts (GW) of generation capacity and 890 GW of storage are currently sitting in active interconnection queues across the U.S. Only 13% of capacity that applied from 2000 to 2019 had actually reached commercial operation by the end of 2024.

*Bottom Line: The queue is not just long but has become a structural filter that favors well-capitalized companies with existing grid relationships (discussed further in this issue)*

### Water:

Data centers are highly water-intensive. A hyperscale facility using evaporative cooling typically consumes 400,000 to 550,000 gallons of water per day, while the largest AI-heavy facilities consume several million gallons daily[^7]. Evaporative cooling uses water to absorb heat from server racks, evaporating it into the air to maintain safe operating temperatures.

Phoenix, Mesa, and the broader Desert Southwest, where a significant share of new capacity is being planned, have some of the most complex water supply dynamics in the U.S. Water permitting is emerging as a third physical constraint alongside power and interconnection. Local communities in Oregon, Washington, and parts of New Mexico have actively pushed back against data center water draws from local aquifers.

Together, these three constraints: transformer shortages, interconnection backlogs, and water limits, explain why industry reports indicate that nearly half of planned U.S. data center projects have faced severe delays or cancellations/pushbacks despite record demand. The bottleneck is not demand; it is the physical infrastructure required to serve it[^15].

*This brings us to an earlier discussion of well-capitalized incumbents with existing or future-proof deals.*

---

## PART THREE: Capturing the Grid

The tech giants’ response to the power constraint is the most consequential energy story of the decade. They are going nuclear, not as a green PR stunt, but as the only carbon-free, always-on power source that can reliably supply the continuous **base load** of electricity their facilities require.

### Infrastructure Primer: Baseload Power vs. Peakers

- **Baseload Power:** The continuous, stable level of electricity that must flow through the grid 24/7 to keep essential systems running. Nuclear plants excel at this because they operate continuously for months at a time.
- **Peaker Plants:** Natural gas-fired power plants that can start up in minutes. They are expensive to run and emit carbon, but they act as essential backups during peak demand surges (like hot summer afternoons).

### The Power Purchase Agreement strategy:

The below table summarizes who signed what and when power actually flows. Three strategic distinctions stand out.

- First, Microsoft's 2027 grid date remains contested: Constellation filed a FERC tariff waiver (Docket ER26-2028-000) in March 2026 to transfer interconnection rights from retiring Eddystone gas plants to the Crane site, and the PJM Independent Market Monitor formally opposed the move in April 2026. A FERC decision expected by mid-2026 makes this the most closely watched regulatory test case in the sector[^8][^9].
- Second, where Microsoft and Meta contracted for power output, Google owns the infrastructure pipeline outright, a structural bet that the interconnection queue is too broken to navigate through PPAs alone[^16][^17].
- Third, the Amazon and Oracle timelines are 2030s stories at best; they do not change the compute availability calculus for decisions being made in 2026[^10][^11]

![Who Signed What, and When Power Actually Flows](/content/writing/img/issue2-fig4.png)

**The Honest Timeline:** These are structural bets, not marginal plays. But the timelines need to be stated honestly. **Natural gas peakers will fill the gap between now and when nuclear capacity actually flows.** The IEA projects natural gas adds roughly 175 TWh to meet U.S. data center demand through 2035[^1]. For practitioners making decisions in 2026, the nuclear buildout is real but slow and the compute infrastructure decisions being made today will be constrained by the power infrastructure that exists today, not the power infrastructure that is promised for 2035.

---

## PART FOUR: What This Means for Biological AI and Your Career

Here is the part that is most relevant to our profession specifically.

### The Structural Moat in Biological AI:

Training a large biological foundation model is genuinely compute-intensive. For example, EvolutionaryScale’s ESM3 which is trained on approximately 2.78 billion protein sequences was formally published in *Science* in February 2025, showing it required over 10²⁴ floating point operations, more compute than any previous biological model[^12]. That represents hundreds of millions of dollars of GPU-hours at current spot pricing.

Genentech’s gCS, Lilly’s AI Factory with Nvidia’s Blackwell Ultra GPUs, and the platforms being built by Recursion (BioHive-2) and Amgen/deCODE (DGX SuperPOD) exist precisely because a single academic lab or mid-size biotech cannot physically procure that compute, probably for lack of money and also lack of access to the grid capacity to run it.

This is creating a lasting competitive advantage for a small group of organizations. The infrastructure needed to build powerful AI for biology, including reliable electricity, access to the electrical grid, and specialized hardware, is becoming concentrated in large pharmaceutical companies, with NVIDIA providing the underlying technology.

NVIDIA's BioNeMo platform is a direct response to this gap: it packages the expensive training infrastructure as a service, so pharma companies can simply purchase it rather than build it from scratch. Smaller players like university labs and early-stage biotech startups are increasingly priced out, not by a lack of talent or ideas, but by a lack of raw computing power. If they can compete at all, it will be through the one thing large companies cannot easily replicate: unique biological data and deep domain expertise.

### Compute Sovereignty: The Rise of the Compute Architect

The energy constraint is real, and it is already showing up in the tools bioinformatics teams use every day. But for teams navigating this transition, the primary threat is not just a rising AWS bill. It is the **illusion of cheap AI**, and the strategic trap it represents.

Right now, calling a proprietary API to predict protein folding or analyze clinical literature or data feels incredibly cheap. But this pricing is artificial. We are currently living in a venture-subsidized "Golden Hour" where AI labs and hyperscalers are absorbing billions in losses, selling API tokens below the physical cost of the energy required to generate them, all to capture market share.

Once this land-grab phase ends, driven by public market pressure for profitability and the harsh reality of grid-level power costs, these subsidies will vanish. To survive this coming "AI Inflation," bioinformatics-heavy businesses must prioritize **Compute Sovereignty**, meaning the ability to own, run, and port their workflows without being locked into a single proprietary gatekeeper.

This shift completely redefines the premium bioinformatics skillset. The value of simply executing a standard pipeline is rapidly commoditizing. The next-generation bioinformatician who commands premium value is a **Compute Architect**, a strategic hybrid scientist who designs the scientific, physical, and economic flow of data.

**A Compute Architect builds structural resilience by balancing three core skills and a future fourth:**

1. **Model Efficiency (The Optimizer):** They recognize that algorithmic efficiency is collapsing compute requirements. As demonstrated by the DeepSeek R1 release (which drove Nvidia's massive January 2025 market cap plunge[^13][^14]), you do not need nuclear-scale cloud resources to fine-tune a model. The Architect masters model compression, shrinking massive biological models to run on localized, cheaper hardware.
2. **Total Portability (The Migrator):** They write pipeline workflows (using Nextflow, Cromwell, Docker) that can run anywhere. This ensures the organization is never held hostage by a single cloud provider’s pricing surge; if AWS rates spike, the entire footprint moves overnight to a private local cluster (SLURM) or a specialized GPU cloud.
3. **Smart Cost Control (The Controller):** They treat compute economics as a core scientific variable. For clinical teams deploying LLMs, "tokens per joule" is now a primary architecture metric. They deploy on optimized inference stacks (like vLLM) and aggressively prune output length to cut energy footprint by 25–40% per query[^20]. They also set up dynamic storage rules to automatically flush expensive hot storage.

### Future Forth - Neuromorphic Computing: The 2030s Efficiency Story:

A research development worth tracking, even though it is not a near-term operational story, is neuromorphic computing. A February 2026 paper in the National Science Review by Xu and colleagues demonstrated a spiking neural network language model running at 13.85 watts with a throughput of 161.8 tokens per second, roughly 19.8 times more energy-efficient than an equivalent model on an Nvidia A800 GPU[^22]. SpiNNcloud Systems, a German startup, deployed a neuromorphic supercomputer at Leipzig University in 2026 specifically for protein-folding and personalized medicine applications, claiming up to 26 times the energy efficiency of GPUs on those workloads[^21].

**The honest timeline:** neuromorphic hardware currently handles inference for models in the one to three billion parameter range on research hardware. General-purpose frontier LLM inference at hyperscale on neuromorphic chips is a 2030s story at the earliest. But the direction matters. DeepSeek showed that algorithmic efficiency can collapse the compute requirement at the software layer. Neuromorphic computing is the hardware-layer version of that thesis. If it matures on the same trajectory, the power problem that currently creates a structural moat for large pharma may be considerably smaller a decade from now. That is relevant context for career planning.

That hardware trajectory is precisely why the **Compute Architect** role carries long-term staying power. As the energy ceiling begins to lift, the organizations that invested early in portable, resource-efficient, and open-source-aligned workflows will be positioned to absorb those gains fastest. The Compute Architect is not just insulating early-stage discovery science from today's hyperscaler pricing traps and grid constraints; they are building the institutional muscle to absorb whatever hardware generation comes next.

*This is the kind of high-leverage, complex competency that cannot be replicated by an offshore team executing a run-book. It requires understanding both the biology of the pipeline and the physics of the billing, and that combination is rare. It represents the ultimate career moat in the age of constrained compute, and sits squarely in the upper arm of the K-shaped curve we will map in Issue 5.*

**NEXT ISSUE** *Issue 3 covers the pharma playbook: how big pharma and AI-native biotechs are redefining computational biology work, and why the most important career move in the sector right now may not be the one you expect.*

---

[^1]: IEA, “Energy and AI,” April 2025. https://iea.org/reports/energy-and-ai
[^2]: IEA, “Electricity 2026,” January 2026. https://iea.org
[^3]: World Economic Forum / IEA, “Energy and AI report: Data centers to rival national grids,” April 2025. https://weforum.org
[^4]: DOE, “Large Power Transformer Resilience Report to Congress,” July 2024. https://energy.gov
[^5]: CISA/NIAC, “Addressing the Critical Shortage of Power Transformers,” June 2024. https://cisa.gov
[^6]: LBNL, “Queued Up: 2025 Edition,” https://emp.lbl.gov
[^7]: MOST Policy Initiative, “Data Center Water Use,” https://mostpolicyinitiative.org
[^8]: Constellation Energy, “Constellation to Launch Crane Clean Energy Center,” September 20, 2024; FERC Docket ER26-2028-000, filed March 31, 2026. https://constellationenergy.com
[^9]: Constellation Energy, “Constellation, Meta Sign 20-Year Deal for Clean, Reliable Nuclear Energy in Illinois,” June 3, 2025. https://constellationenergy.com
[^10]: X-energy, “Amazon Invests in X-energy to Support Advanced Small Modular Nuclear Reactors,” October 2024; Series D closed November 24, 2025. https://x-energy.com
[^11]: CNBC, “Oracle is designing a data center that would be powered by three small nuclear reactors,” September 10, 2024.
[^12]: Hayes T, Rao R, Akin H, Sofroniew NJ, Oktay D, Lin Z, Verkuil R, et al. “Simulating 500 million years of evolution with a language model,” Science 387(6736), Feb 21, 2025. DOI: 10.1126/science.ads0018, https://doi.org/10.1126/science.ads0018
[^13]: Bloomberg, “Nvidia’s $590 Billion DeepSeek Plunge Is Largest in Market History,” January 27, 2025.
[^14]: NVIDIA, Form 8-K FY2026 Current Report, filed February 25, 2026. SEC EDGAR
[^15]: Tom’s Hardware, “Reports indicate severe power constraints delay or cancel up to half of planned US data center projects,” 2026. https://tomshardware.com
[^16]: NextEra Energy / Google, “NextEra Energy and Google Announce 25-Year Agreement for Duane Arnold Nuclear Power,” October 27, 2025. https://nexteraenergy.com
[^17]: Alphabet / TPG, “TPG Announces Completion of $4.75 Billion Sale of Intersect’s Digital Power Business to Google,” March 10, 2026. https://tpg.com
[^18]: Epoch AI, “GPUs account for about 40% of power usage in AI data centers,” December 18, 2025. https://epoch.ai/data-insights/gpus-power-usage-in-ai-data-centers
[^19]: Sightline Climate, Data Center Outlook April 2026; Bloomberg, “America’s AI Build-Out Hinges on Chinese Electrical Parts,” April 1, 2026
[^20]: Niu et al., “TokenPowerBench: Benchmarking the Power Consumption of LLM Inference,” AAAI 2026. arXiv:2512.03024, https://arxiv.org/abs/2512.03024
[^21]: SpiNNcloud Systems, “Neuromorphic Supercomputer Deployed at Leipzig University,” 2026.
[^22]: Xu et al., "Neuromorphic spike-based large language model," National Science Review 13(4), nwaf551, February 2026. DOI:10.1093/nsr/nwaf551, https://doi.org/10.1093/nsr/nwaf551
