import type { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) =>
    await queryInterface.bulkInsert(
      "Courses",
      [
        {
          id: 1,
          title: "Financial Accounting",
          descr:
            "An introduction to the basic framework of accounting for students majoring in accountancy or other disciplines. Includes preparation of financial records and external financial reports. Emphasis on the underlying accounting concepts and constraints. ",
          hours: "3",
          coreq_id: 1,
        },
        {
          id: 2,
          title: "Financial Accounting Lab",
          descr: "This course is the lab for ACG 201.",
          hours: "1",
          coreq_id: 1,
        },
        {
          id: 3,
          title: "Evolutionary Biology",
          descr:
            "Study of biological change over time through pathways of descent and through adaptation, including how biological diversity, from molecular through organismal levels, originates and is maintained. Focus on modern evolutionary analysis and applications in medicine, agriculture, and conservation. ",
          hours: "3",
          coreq_id: 26,
        },
        {
          id: 4,
          title: "Two-Dimensional Design",
          descr: "Study of the principles of two-dimensional design and introduction to color theory. ",
          hours: "3",
          coreq_id: 28,
        },
        {
          id: 5,
          title: "Drawing Fundamentals",
          descr: "Fundamentals of drawing; investigation of processes and visual concepts with emphasis on charcoal.",
          hours: "3",
          coreq_id: 266,
        },
        {
          id: 6,
          title: "3-D Computer Graphics Tools and Literacy",
          descr:
            "Project-based approach to learning fundamental principles of 3-D computer graphics using high-level software tools. Modeling of objects, geometrical transformations, surface algorithms, lighting and shading, alternative rendering techniques, and providing background skills necessary to create animated movies. ",
          hours: "3",
          coreq_id: 29,
        },
        {
          id: 7,
          title: "Introduction To Graphic Design",
          descr:
            "Basic principles of graphic design and communication. Projects focus on the graphic expression of form through two-dimensional composition to communicate information, concepts, and emotions, and combine development of computer software skills with off-line creative processes and production methods. ",
          hours: "3",
          coreq_id: 32,
        },
        {
          id: 8,
          title: "Introduction to Digital Photography",
          descr:
            "Digital photography concepts and methods. Designing, processing, critiquing, and displaying of images created with digital cameras and printed with digital media.",
          hours: "3",
          coreq_id: 33,
        },
        {
          id: 9,
          title: "Statistical Analysis for Business and Economics",
          descr:
            "Classification and presentation of business and economics data, probability and expected value, statistical inference, simple linear regression and correlation analysis. ",
          hours: "3",
          coreq_id: 34,
        },
        {
          id: 10,
          title: "Concepts of Modern Biology",
          descr:
            "An introduction to the diversity of life and the principles governing living systems, focusing on the role of humans in the natural world. This course employs multi-media instructional materials and is designed for the non-biology major. Three lecture hours and three laboratory/discussion hours each week. ",
          hours: "0 to 4",
          coreq_id: 35,
        },
        {
          id: 11,
          title: "Human Physiology",
          descr:
            "Introduction to the function of the human body emphasizing basic physiological principles and their relation to current health trends and fads.",
          hours: "3",
          coreq_id: 2,
        },
        {
          id: 12,
          title: "Humans and Ecology",
          descr:
            "Introduction to the principles of ecology including concepts of succession, biotic communities, biodiversity, limits on population growth and conservation of natural resources. ",
          hours: "3",
          coreq_id: 36,
        },
        {
          id: 13,
          title: "Genetics in Human Affairs",
          descr:
            "Discussion of basic principles of genetics (for non-majors or majors) with the ultimate goal of developing an understanding of the relationship of genetics to the society of today and its possible influence on the future of humans. Survey of current knowledge of the inheritance of human traits is included.",
          hours: "3",
          coreq_id: 37,
        },
        {
          id: 14,
          title: "Biology of the Sea",
          descr:
            "Introduction to marine environments, the diversity of marine life, and the role of humans in the utilization of marine resources. Study of local marine habitats, including salt marshes, sandy beaches, tidal flats and rocky shores. ",
          hours: "3",
          coreq_id: 38,
        },
        {
          id: 15,
          title: "Plants and the Environment",
          descr:
            "Introduction to the plant kingdom through study of plant diversity, structure, and function as they relate to environmental issues such as global carbon balance, deforestation, agricultural runoff, and the effects of the introduction of genetically engineered plants. Impact of plants on human culture, history, civilization, and economics will be discussed. ",
          hours: "3",
          coreq_id: 39,
        },
        {
          id: 16,
          title: "Microbes and Human Society",
          descr:
            "Introduction to the world of the microorganism, focusing on the diversity, structure and function of microbial life, the spread and control of disease-producing organisms, and the impact of these life forms on human culture, history, and civilization. ",
          hours: "3",
          coreq_id: 40,
        },
        {
          id: 17,
          title: "Principles of Biology: Cells",
          descr:
            "Introduction to principles governing living systems, especially the cellular and molecular basis of life and the transmission and utilization of genetic information. Laboratory exercises introduce basic investigative skills and methods of biological inquiry. ",
          hours: "0 to 4",
          coreq_id: 41,
        },
        {
          id: 18,
          title: "Principles of Biology: Biodiversity",
          descr:
            "Evolution, classification, and diversity of life, stressing morphology, physiology, principles of adaptation, and relationships between biotic and abiotic components of ecosystems. Laboratory exercises introduce major taxonomic groups and biotic principles. ",
          hours: "0 to 4",
          coreq_id: 42,
        },
        {
          id: 19,
          title: "Human Anatomy and Physiology I",
          descr:
            "An introduction to the human organism with particular emphasis on maintenance of an internal steady state. Tissues, musculoskeletal, nervous, and endocrine systems are stressed.",
          hours: "3",
          coreq_id: 21,
        },
        {
          id: 20,
          title: "Human Anatomy and Physiology II",
          descr:
            "A comprehensive study of human organ systems as relates to the maintenance of homeostasis. Topics include cardiovascular, respiratory, digestive, urinary, and reproductive systems.",
          hours: "3",
          coreq_id: 3,
        },
        {
          id: 21,
          title: "Microbiology of Human Diseases",
          descr:
            "An introduction to and survey of the biology of pathogenic microorganisms responsible for human infectious diseases including: bacteria, viruses, fungi, single-celled protozoans, and parasitic worms, with an emphasis on transmission, diagnosis, prevention, and clinical management.",
          hours: "3",
          coreq_id: 22,
        },
        {
          id: 22,
          title: "Introductory Research",
          descr:
            "Laboratory and computational research under faculty supervision beyond what is offered in existing courses. ",
          hours: "1 to 3",
          coreq_id: 43,
        },
        {
          id: 24,
          title: "Biology of Cancer",
          descr:
            "A comprehensive and multifaceted approach to studying cancer. Focus on research methods in three areas of investigation: basic cancer biology, cancer epidemiology, and clinical cancer research. ",
          hours: "3",
          coreq_id: 46,
        },
        {
          id: 25,
          title: "Terrestrial Botany",
          descr:
            "Morphological and anatomical survey of the embryophytes (land plants) with an emphasis on life histories, evolutionary origins, and phylogenetic relationships. May include local field trips.",
          hours: "4",
          coreq_id: 47,
        },
        {
          id: 27,
          title: "Marine Phycology",
          descr:
            "Introduction to the morphology, life histories, and ecology of benthic marine algae with emphasis on special topics such as morphogenesis, ecotypic variation and speciation, phytogeography, or seasonal periodicity of growth and reproduction. ",
          hours: "4",
          coreq_id: 49,
        },
        {
          id: 28,
          title: "Mycology",
          descr:
            "Taxonomy, physiology and morphology of fungi with emphasis on their life strategies and roles in the ecosystem. Also includes an in-depth consideration of human pathogenic fungi.",
          hours: "3",
          coreq_id: 4,
        },
        {
          id: 29,
          title: "Comparative Vertebrate Anatomy",
          descr:
            "Comparative morphology and phylogenetic interrelationships of vertebrate animals; representative organisms dissected in laboratory. ",
          hours: "4",
          coreq_id: 50,
        },
        {
          id: 30,
          title: "Human Embryology",
          descr:
            "Fundamental principles of human embryonic development. The comparative morphology and phylogenetic interrelationships between developmental processes are emphasized. Common birth defects are discussed with the organ systems. ",
          hours: "3",
          coreq_id: 51,
        },
        {
          id: 31,
          title: "Vertebrate Histology",
          descr:
            "An introduction to the cytology and morphology of vertebrate cells and tissues, including examination of the four major histological tissues: epithelium, connective tissue, muscle, and nerve. Other topics include the techniques and instrumentation of light microscopy and selected methods of sectioning, fixation, and staining of tissues. Student project required. ",
          hours: "4",
          coreq_id: 52,
        },
        {
          id: 32,
          title: "Invertebrate Zoology",
          descr:
            "Survey of invertebrate animals with emphasis on the structure, function, phylogeny, ecology, and life histories of marine taxa.",
          hours: "4",
          coreq_id: 53,
        },
        {
          id: 34,
          title: "Biological Invasions",
          descr:
            "The scientific study of the invasion process, persistence, and spread of introduced species; ecological and economic impacts and management of introduced species; and how global change influences the impact of introduced species on human resources. ",
          hours: "3",
          coreq_id: 55,
        },
        {
          id: 35,
          title: "Molecular Biology of the Cell",
          descr: "",
          hours: "3",
          coreq_id: 5,
        },
        {
          id: 36,
          title: "Microbiology",
          descr:
            "Study of pathogenic and nonpathogenic microorganisms with emphasis on the biology of bacteria and viruses.",
          hours: "3",
          coreq_id: 6,
        },
        {
          id: 37,
          title: "Genetics",
          descr: "Principles of Mendelian inheritance, gene action and molecular genetics, and population genetics. ",
          hours: "3",
          coreq_id: 7,
        },
        {
          id: 38,
          title: "Plant Physiology",
          descr:
            "Study of plant function at the molecular, cellular, and organismic levels, with emphasis placed on unique aspects of vascular plants. Topics include water relations, solute transport, photosynthesis, nitrogen metabolism, plant hormones, photo control of development, and stress physiology. ",
          hours: "4",
          coreq_id: 56,
        },
        {
          id: 39,
          title: "Animal Physiology",
          descr:
            "Comparative study of physiological processes in different organisms approached through study of tissues, organs, and systems. ",
          hours: "3",
          coreq_id: 8,
        },
        {
          id: 40,
          title: "Herpetology",
          descr:
            "Study of reptiles and amphibians with emphasis on their evolution, physiology, ecology, behavior, and conservation. Laboratory focuses on species identification and field techniques for studying herpetofauna. Several field trips to local areas. ",
          hours: "4",
          coreq_id: 57,
        },
        {
          id: 41,
          title: "Vertebrate Natural History",
          descr:
            "An introduction to the vertebrates with emphasis on systematics, adaptations, life history, behavior, and ecology. Laboratory emphasis on the identification and natural history of regional fauna. Limited field study is required. ",
          hours: "4",
          coreq_id: 58,
        },
        {
          id: 43,
          title: "Marine Mammals",
          descr:
            "Study of pinnipeds, cetaceans, and sirenians, emphasizing their evolution and taxonomic relationships, anatomical and physiological adaptations, ecologic and economic importance, and natural history. ",
          hours: "3",
          coreq_id: 59,
        },
        {
          id: 44,
          title: "Biology of Infectious Diseases",
          descr:
            "Course provides a conceptual overview of parasites and their modes of transmission, host-parasite co-evolution, population dynamics of disease, emerging diseases of humans, animals, and plants, disease control, and the effects of parasites on individuals, populations, communities, and ecosystems. ",
          hours: "3",
          coreq_id: 60,
        },
        {
          id: 45,
          title: "Marine Biology",
          descr: "The coastal and oceanic biota and their relationship to the marine environment.",
          hours: "4",
          coreq_id: 10,
        },
        {
          id: 46,
          title: "Ecology",
          descr:
            "An introduction to basic ecological principles as they pertain to individual organisms, populations, communities and systems.",
          hours: "3",
          coreq_id: 11,
        },
        {
          id: 47,
          title: "Antarctic Ecology, Geology, History, and Policy",
          descr:
            "An in-depth examination of the frozen continent including its geologic origins, ice sheet formation, and fossil record. Its unique ecology, endemic wildlife, discovery and human history, anthropogenic impacts, and current international agreements to protect resources will also be examined. Open to juniors and seniors from all major departments.",
          hours: "3",
          coreq_id: 62,
        },
        {
          id: 48,
          title: "Behavioral Ecology",
          descr:
            "Evolutionary approach focusing on both proximate and ultimate causes of behavior. Feeding and antipredatory behavior, habitat selection, territoriality, reproductive behavior, mating systems, parental care, animal communication, and the evolution of social behavior. Emphasis on birds, mammals, and fish. ",
          hours: "3",
          coreq_id: 63,
        },
        {
          id: 49,
          title: "Evolutionary Medicine",
          descr:
            "The scientific study of evolutionary principles as they apply to human health and disease. Topics include antibiotic resistance, pathogen virulence, aging, cancer, autoimmune disease, obesity, and mental illness. ",
          hours: "3",
          coreq_id: 64,
        },
        {
          id: 50,
          title: "Phytoplankton",
          descr:
            "Introduction to the biology of freshwater and marine microalgae. Focus on morphology, life histories, physiology, systematics and ecology. ",
          hours: "4",
          coreq_id: 66,
        },
        {
          id: 51,
          title: "Global Environmental Problems",
          descr:
            "Review and discussion of causes and effects of major environmental problems, with emphasis on ecosystem-level effects and interactions. Topics include extinction, deforestation, climate change, and pollution impacts. ",
          hours: "3",
          coreq_id: 67,
        },
        {
          id: 54,
          title: "Biotechnology",
          descr:
            "A survey of techniques used in biotechnology and application of these techniques for practical biomedical and environmental use. Topics include cloning, genetic engineering, PCR, RNAi, antibody technologies, vaccines, microarrays, bioremediation, biofuels, drug discovery and synthesis, gene therapy, transgenics, cloning, stem cells, forensics, and biowarfare.",
          hours: "3",
          coreq_id: 70,
        },
        {
          id: 55,
          title: "The Human Microbiome",
          descr:
            "Foundational knowledge on the structure and function of microbes living in and on the human body, with a particular focus on human health and homeostasis. ",
          hours: "3",
          coreq_id: 71,
        },
        {
          id: 56,
          title: "Marine Botany",
          descr:
            "An introduction to coastal marine plant communities, including how the marine environment affects plant community dynamics. Topic areas include: classification and identification, morphology, physiological ecology, importance to humans, and current hot topics.",
          hours: "4",
          coreq_id: 48,
        },
        {
          id: 58,
          title: "Immunology",
          descr:
            "An introduction to the basic principles of immunology, including the normal immune response and consequences of immune dysfunction. Autoimmunity, immunodeficiencies including AIDS, and hypersensitivities are included. ",
          hours: "3",
          coreq_id: 74,
        },
        {
          id: 61,
          title: "Parasitology",
          descr:
            "An introduction to the single-cell and multi-cellular eukaryotic parasites infecting humans. Special emphasis will be given to parasite structure, genetics, physiology, life cycle, ecology, and host response. ",
          hours: "3",
          coreq_id: 76,
        },
        {
          id: 62,
          title: "Evolutionary Biology",
          descr:
            "Study of biological change over time through pathways of descent and through adaptation, including how biological diversity, from molecular through organismal levels, originates and is maintained. Focus on modern evolutionary analysis and applications in medicine, agriculture, and conservation. ",
          hours: "3",
          coreq_id: 26,
        },
        {
          id: 63,
          title: "Coastal Marine Ecology",
          descr:
            "An in-depth study of the major processes controlling populations and structuring coastal marine communities. Emphasis is on the review and discussion of important historical and recent scientific papers. ",
          hours: "3",
          coreq_id: 77,
        },
        {
          id: 64,
          title: "Virology",
          descr:
            "An introduction to the fundamental principles of virology. Key concepts include virus structure, replication strategies, classification and taxonomy, diagnostics, pathogenesis, epidemiology, immunity, gene therapy, and vaccines and antivirals.",
          hours: "3",
          coreq_id: 78,
        },
        {
          id: 65,
          title: "Epidemiology",
          descr:
            "Introduction to the basic concepts of epidemiology and biostatistics as applied to public health problems. Emphasis is placed on summaries and displays of data, statistical approaches to describe the health of populations, analytic study designs for investigating associations between risk factors and disease outcomes and criteria for causal inference. ",
          hours: "3",
          coreq_id: 79,
        },
        {
          id: 66,
          title: "Stem Cell and Regenerative Biology",
          descr:
            "Principles of cellular and molecular mechanisms of regeneration in a diversity of animals. Topics include the contribution of stem cells to the developmental and regenerative processes of various organisms and how these themes intersect with human health. ",
          hours: "3",
          coreq_id: 80,
        },
        {
          id: 67,
          title: "Developmental Biology",
          descr:
            "Concepts of mechanism and control during animal embryology and organ morphogenesis. Topics include chemical signals and signal transduction, different gene expression, and the techniques used to study them. Current primary research literature is stressed.",
          hours: "3",
          coreq_id: 13,
        },
        {
          id: 68,
          title: "Neurobiology",
          descr:
            "General concepts of cellular neuronal signaling and circuit connectivity with an emphasis on how simple neuronal circuits produce behavior and behavioral variability. ",
          hours: "3",
          coreq_id: 81,
        },
        {
          id: 69,
          title: "Environmental Physiology",
          descr:
            "Study of the physiological and biochemical mechanisms by which organisms adapt to the physical parameters within their environments (e.g., temperature, salinity, pressure, hypoxia, altitude) and acclimate to environmental change.",
          hours: "3",
          coreq_id: 82,
        },
        {
          id: 70,
          title: "Toxicology",
          descr:
            "Introduction to basic concepts of toxicology as they relate to both ecological and human health, including distribution, cellular penetration, metabolic conversion, and elimination of toxic agents, as well as the fundamental laws governing the interaction of foreign chemicals with biological systems. Focus is on the application of these concepts to the understanding and prevention of the adverse effects resulting from environmental, occupational, or medical exposure to toxic substances (i.e., pesticides, pharmaceuticals, endocrine disrupting compounds). ",
          hours: "3",
          coreq_id: 83,
        },
        {
          id: 71,
          title: "Mammalogy",
          descr:
            "Study of mammals, emphasizing their evolution, taxonomic relationships, structural and physiological adaption, and life histories. ",
          hours: "4",
          coreq_id: 84,
        },
        {
          id: 73,
          title: "Field Methods in Marine Mammalogy",
          descr:
            "Research experience in field and laboratory techniques pertaining to marine mammal ecology, behavior, and communication. ",
          hours: "3",
          coreq_id: 86,
        },
        {
          id: 74,
          title: "Ornithology",
          descr:
            "An introduction to avian biology with an emphasis on the evolution, classification, physiology, ecology, natural history, and conservation of birds. Laboratory focuses on avian anatomy and field identification of North Carolina birds with field trips to local areas. The class may include weekend camping trips or visits to field stations in North Carolina.",
          hours: "4",
          coreq_id: 87,
        },
        {
          id: 75,
          title: "Ichthyology",
          descr:
            "Survey of systematics, evolution, ecology, and natural history of living fishes, with emphasis on southeastern United States.",
          hours: "3",
          coreq_id: 14,
        },
        {
          id: 76,
          title: "Fisheries Biology",
          descr:
            "An examination of the factors that control the population dynamics of fishes. Introduction to the principles of fisheries science including estimation of population metrics such as age, growth, mortality, and abundance, fish stock assessment, and fishery management strategies.",
          hours: "3",
          coreq_id: 15,
        },
        {
          id: 77,
          title: "Endocrinology",
          descr:
            "A survey of the biochemistry, physiology and anatomy of the endocrine system of vertebrates and selected invertebrates. Steroid, peptide, and terpenoid hormones that control reproduction, growth and other parameters will be discussed.",
          hours: "3",
          coreq_id: 88,
        },
        {
          id: 78,
          title: "Limnology",
          descr:
            "An examination of the physical, chemical, and biological characteristics of freshwater systems, particularly lakes and ponds.",
          hours: "3",
          coreq_id: 16,
        },
        {
          id: 79,
          title: "Deep Sea Biology",
          descr:
            "Study of deep-sea biosphere, with emphasis on the biology of abyssal zones off the North Carolina coast and hydrothermal vent ecosystems. Topics include unique benthic and pelagic animals in deep-sea environments and their physiological adaptations to hydrostatic pressure and low temperature, nutritional dynamics, reproductive strategies, energy flow, and speciation in abyssal and ultra abyssal zones.",
          hours: "3",
          coreq_id: 89,
        },
        {
          id: 80,
          title: "Coral Reef Ecology",
          descr:
            "Ecology and physiology of coral reef organisms, emphasizing processes that contribute to the function and complexity of coral reef ecosystems. Reef information and geology, coral biology and physiology, ecological interactions, human effects, global effects, and conversation will be considered.",
          hours: "3",
          coreq_id: 17,
        },
        {
          id: 81,
          title: "Biochemistry",
          descr:
            "Chemical properties and metabolism of amino acids, proteins, carbohydrates, lipids, and nucleic acids; enzymes kinetics; bioenergetics regulatory mechanisms.",
          hours: "3",
          coreq_id: 18,
        },
        {
          id: 82,
          title: "Conservation Biology",
          descr:
            "A scientific approach to the protection, maintenance, and restoration of biological diversity, including its ecological and evolutionary processes and total environment.",
          hours: "3",
          coreq_id: 90,
        },
        {
          id: 83,
          title: "Mariculture",
          descr:
            "Overview of basic principles of fish and shellfish production. Focus on the basic features of culture systems, biology of major culture species and legal and economic aspects of mariculture. Specific culture techniques for a variety of marine species, with special emphasis on the southeast US coast. ",
          hours: "3",
          coreq_id: 91,
        },
        {
          id: 85,
          title: "Plant Systematics",
          descr:
            "An introduction to identification, classification, and nomenclature of vascular plants with emphasis on the flora of southeastern North Carolina. ",
          hours: "4",
          coreq_id: 93,
        },
        {
          id: 87,
          title: "Field Studies in Biology",
          descr:
            "A research/experience-oriented field course offered in selected regional locales. Emphasis is placed on distribution, taxonomy, and ecology of animal and/or plant organisms. May be repeated under different subtitles. BIO 366 and credit in advanced zoology or botany recommended. ",
          hours: "1 to 6",
          coreq_id: 95,
        },
        {
          id: 88,
          title: "Wildlife Ecology",
          descr:
            "Principles of wildlife ecology and management, including population dynamics, diseases, techniques, behavior, habitat manipulations, policy and administration, and contemporary issues such as antihunting. Assigned field problems.",
          hours: "3",
          coreq_id: 96,
        },
        {
          id: 89,
          title: "Biology of Crustaceans",
          descr:
            "A survey of the crustaceans to include: anatomy, taxonomy, physiology, behavior, and diversity. Focus on basic crustacean biology for both economically important species and those animals frequently used in biological research.",
          hours: "3",
          coreq_id: 19,
        },
        {
          id: 90,
          title: "Methods in Biological Research",
          descr:
            "Introduction to experimental design, data acquisition, statistical analysis, and preparation of manuscripts and presentations. Emphasis on multi-disciplinary approaches to hypothesis testing. Participation in a collaborative research project.",
          hours: "1 to 3",
          coreq_id: 97,
        },
        {
          id: 91,
          title: "Special Topics in Advanced Biology",
          descr:
            "Explains selected topics not considered in detail in regular course offerings. More than one topic may be taken for credit.",
          hours: "0 to 6",
          coreq_id: 98,
        },
        {
          id: 92,
          title: "Advanced Topics in Mariculture",
          descr:
            "Advanced mariculture topics not considered in detail in other courses. More than one topic may be taken for credit.",
          hours: "3",
          coreq_id: 99,
        },
        {
          id: 93,
          title: "Introduction to Coastal Management",
          descr:
            "Interdisciplinary study of human impact on coastal environments and organisms. Topics include the physical and biotic settings of worldwide coastal regions, principles of coastal management, current topics in coastal management, and analysis of potential solutions to coastal problems. ",
          hours: "4",
          coreq_id: 100,
        },
        {
          id: 94,
          title: "Forensic Environmental Science",
          descr:
            "Presentation and practice of the techniques for applying scientific methods, investigative procedures, legal standards of evidence, and case preparation techniques to investigation of environmental problems. ",
          hours: "3",
          coreq_id: 102,
        },
        {
          id: 95,
          title: "Benthic Ecology",
          descr:
            "The scientific study of the organisms and processes that structure coastal benthic communities. Benthic communities encompass the vast seafloor areas of estuaries and oceans and support aquatic communities, fisheries, larger species of interest, and critical ecosystem processes. ",
          hours: "3",
          coreq_id: 104,
        },
        {
          id: 96,
          title: "Practicum in Biology Teaching",
          descr:
            "Organization, preparation, and assistance in classroom and/or laboratory exercises and demonstrations under faculty supervision. A maximum of 3 credits may be applied to the major.",
          hours: "1 to 4",
          coreq_id: 106,
        },
        {
          id: 97,
          title: "International Study Course",
          descr: "",
          hours: "1 to 6",
          coreq_id: 107,
        },
        {
          id: 98,
          title: "Seminar",
          descr:
            "Individual reports and group discussions of the results of student field, laboratory and/or library research on selected topics in biology.",
          hours: "1",
          coreq_id: 20,
        },
        {
          id: 99,
          title: "Internship in Biological Sciences",
          descr:
            "Practical field experience and training through a program of work and study within a business or agency. Students are supervised and evaluated jointly by a biology faculty member and an on-site supervisor. ",
          hours: "1 to 12",
          coreq_id: 108,
        },
        {
          id: 100,
          title: "Honors Work in Biology",
          descr: "Independent study for honor students.",
          hours: "2 to 3",
          coreq_id: 109,
        },
        {
          id: 101,
          title: "Human Physiology Laboratory",
          descr: "Introduction to the scientific method of inquiry using human physiology as a focus.",
          hours: "1",
          coreq_id: 2,
        },
        {
          id: 102,
          title: "Human Anatomy and Physiology Laboratory I",
          descr:
            "Basic histology, dissections, and physiology experiments to demonstrate principles explored in BIO 240. ",
          hours: "1",
          coreq_id: 21,
        },
        {
          id: 103,
          title: "Human Anatomy and Physiology Laboratory II",
          descr:
            "Basic histology, dissections, and physiology experiments to demonstrate principles explored in BIO 241. ",
          hours: "1",
          coreq_id: 3,
        },
        {
          id: 104,
          title: "Microbiology of Human Diseases Laboratory",
          descr:
            "An introduction to basic microbiological laboratory techniques necessary to isolate, identify, stain, culture, and control microorganisms of interest. Special emphasis is placed upon clinical applications through research and completion of historical and clinical case studies.",
          hours: "1",
          coreq_id: 22,
        },
        {
          id: 105,
          title: "Mycology Laboratory",
          descr:
            "Hands-on survey of all major taxa of the fungal kingdom and its protistan allies via macroscopic and microscopic observations as well as field trips. Emphasis on the role of the fungi in the environment.",
          hours: "1",
          coreq_id: 4,
        },
        {
          id: 106,
          title: "Antibiotic Discovery",
          descr: "",
          hours: "1",
          coreq_id: 110,
        },
        {
          id: 107,
          title: "Molecular Biology of Cell Laboratory",
          descr: "Experiments demonstrating basic phenomena underlying cellular function.",
          hours: "1",
          coreq_id: 5,
        },
        {
          id: 108,
          title: "Microbiology Laboratory",
          descr: "Laboratory sessions include techniques to culture, stain, and identify selected microorganisms.",
          hours: "1",
          coreq_id: 6,
        },
        {
          id: 109,
          title: "Genetics Laboratory",
          descr:
            "This course examines major genetic concepts and relationships between those concepts. Students will design, execute, and interpret experiments relating DNA to phenotype and investigate genetic interactions in metabolic pathways. Students will analyze and present experimental results, incorporating relevant literature and information from large-scale public genome repositories.",
          hours: "1",
          coreq_id: 7,
        },
        {
          id: 110,
          title: "Animal Physiology Laboratory",
          descr:
            "Introduction to the equipment and techniques for computer-based acquisition of physiological data. Experience in data analysis and presentation, and in computer simulations of physiological experiments is also included.",
          hours: "1",
          coreq_id: 8,
        },
        {
          id: 112,
          title: "Marine Biology Laboratory",
          descr:
            "Introduction to marine organisms and environments. Laboratory activities are designed to give students experiential knowledge and acquaint them with the regional marine fauna and flora.",
          hours: "1",
          coreq_id: 10,
        },
        {
          id: 113,
          title: "Ecology Laboratory",
          descr:
            "Introduction to ecological sampling techniques and data analysis. Experience in field sampling, laboratory and computer modeling of sampling approaches, and scientific writing is also included.",
          hours: "1",
          coreq_id: 11,
        },
        {
          id: 115,
          title: "Developmental Biology Laboratory",
          descr:
            "Investigations of invertebrate and vertebrate development using the methods of descriptive embryology, experimental manipulation and molecular genetics.",
          hours: "1",
          coreq_id: 13,
        },
        {
          id: 116,
          title: "Ichthyology Laboratory",
          descr:
            "Demonstration of basic anatomy, taxonomy, and natural history of local species in laboratory and field environments. ",
          hours: "1",
          coreq_id: 14,
        },
        {
          id: 117,
          title: "Fisheries Biology Laboratory",
          descr:
            "Exercise includes processing of age and growth information, modeling of growth and mortality, field sampling, abundance estimation, and single-species stock assessments.",
          hours: "1",
          coreq_id: 15,
        },
        {
          id: 118,
          title: "Limnology Laboratory",
          descr: "Field and laboratory investigations of limnological problems with an emphasis on water quality.",
          hours: "1",
          coreq_id: 16,
        },
        {
          id: 119,
          title: "Coral Reef Ecology Laboratory",
          descr:
            "Methods for studying coral reef taxa, community structure, coral physiology, and ecological processes will be explored. Independent project required. ",
          hours: "1",
          coreq_id: 17,
        },
        {
          id: 120,
          title: "Biochemistry Laboratory",
          descr: "Experiments demonstrating basic phenomena and techniques of biochemistry.",
          hours: "1",
          coreq_id: 18,
        },
        {
          id: 121,
          title: "Biology Of Crustaceans Laboratory",
          descr:
            "Demonstration of basic internal and external anatomy, taxonomy, and natural history. Modern methods for measurement of molt cycle and reproduction. Field trips to local environments.",
          hours: "1",
          coreq_id: 19,
        },
        {
          id: 122,
          title: "Applied Learning Seminar",
          descr:
            "Students conduct hands-on project in field or laboratory setting coupled with individual reports and group discussions of the results of their research. ",
          hours: "1",
          coreq_id: 20,
        },
        {
          id: 123,
          title: "General Chemistry I",
          descr:
            "Overview of the fundamental laws, principles and theories of chemistry. A ‘C’ or better in CHM 101 is required to take certain advanced courses in chemistry. ",
          hours: "3",
          coreq_id: 23,
        },
        {
          id: 124,
          title: "General Chemistry II",
          descr:
            "Study of the fundamental laws, principles and theories of chemistry. Introduction to inorganic chemistry. Interpretation of experimental results. A ‘C’ or better in CHM 102 is required to take certain advanced courses in chemistry. ",
          hours: "3",
          coreq_id: 24,
        },
        {
          id: 125,
          title: "Organic Chemistry I",
          descr:
            "Introduction to the chemistry of carbon compounds, including structure, reactions, mechanisms, and the concepts of organic synthesis.",
          hours: "3",
          coreq_id: 25,
        },
        {
          id: 126,
          title: "General Chemistry Laboratory I",
          descr: "Introduction to general chemistry laboratory techniques.",
          hours: "1",
          coreq_id: 23,
        },
        {
          id: 127,
          title: "General Chemistry Laboratory II",
          descr:
            "Introduction to techniques and equipment used in the chemical laboratory. Interpretation of experimental results. ",
          hours: "1",
          coreq_id: 24,
        },
        {
          id: 128,
          title: "Organic Chemistry Laboratory I",
          descr: "Basic laboratory techniques and an introduction to reactions of organic compounds.",
          hours: "1",
          coreq_id: 25,
        },
        {
          id: 129,
          title: "Fluency in Information Technology",
          descr:
            "Information representation, the Internet and HTML, algorithmic thinking and programming, language translation, modeling and abstraction, algorithmic complexity and non-computability, machine architecture and parallel computation, networks and communication, database principles, multimedia, social impacts of computing.",
          hours: "3",
          coreq_id: 111,
        },
        {
          id: 130,
          title: "Digital Media",
          descr:
            "Introduction to technologies of the Internet. Web-page design; graphics and animation; client/server concepts; collaborative computing and group work; network publishing; security and encryption; audio, video, and image compression; ethical issues and privacy; e-commerce; client-side Web programming; and dynamic Web-page generation. ",
          hours: "3",
          coreq_id: 112,
        },
        {
          id: 131,
          title: "Introduction to Databases: Techniques and Technologies",
          descr:
            "Fundamental concepts of database management systems, including advantages of using database management systems, data modeling, relational database design, query-building, security, privacy and ethical issues, and introductions to Web-based processing, Big Data concepts, and non-relational models. ",
          hours: "3",
          coreq_id: 113,
        },
        {
          id: 132,
          title: "Linux Administration",
          descr:
            "Install, configure, securely administer Linux operating system platforms. Topics include Linux operating systems concepts, system installation and configuration, introduction to networking (protocols, IP addressing, ports, subnetting), security, firewalls, packet filtering, networked file systems, lightweight directory access protocol, virtualization, Linux-Windows integration, and Linux shell programming. ",
          hours: "3",
          coreq_id: 114,
        },
        {
          id: 134,
          title: "Cloud Computing & Virtualization",
          descr:
            "Survey, configuration, and deployment of cloud computing technologies and services, including but not limited to: virtualization environments, SaaS, PaaS, DaaS, IaaS, mass storage, virtualization compute resources, SQL and non-SQL databases, cloud development tools, deployment models, load balancing, automatic provisioning, Internet of Things, VPNs, firewalls, security, two-factor authentication, legal/privacy issues. ",
          hours: "3",
          coreq_id: 116,
        },
        {
          id: 135,
          title: "Web Page Development",
          descr:
            "Study of the design and creation of web pages that support traditional screens, tablets, and smart devices. Topics include page structure, human-computer interface design, style sheets, reusability, and design concepts. Best industry practices, such as client-side scripting languages and Search Engine Optimization (SEO) techniques, will also be considered. ",
          hours: "3",
          coreq_id: 117,
        },
        {
          id: 136,
          title: "Network Fundamentals",
          descr:
            "Introduction to the OSI model, network topologies, IP addressing, and subnet masks, simple routing techniques, and basic switching terminology. Topics include the basic functions of the seven layers of the OSI model, different classes of IPaddressing and subnetting, router login scripts. ",
          hours: "3",
          coreq_id: 119,
        },
        {
          id: 137,
          title: "Information Security Management",
          descr:
            "Current standards of due care and best business practices in Information Security. Includes examination of security technologies, methodologies, and practices. Focus is on evaluation and selection of optimal security posture. Topics include evaluation of security models, risk assessment, threat analysis, organizational technology evaluation, security implementation, disaster recovery planning, and security policy formulation and implementation. ",
          hours: "3",
          coreq_id: 120,
        },
        {
          id: 138,
          title: "System Administration",
          descr:
            "Principles and application of computer hardware and software will be presented through lecture of the underpinnings, installation, configuration, and laboratory experiences. This course will provide the technology background for system developers to understand trade-offs in architecture for effective use in a business environment. Networked computing systems and various operating systems will be covered. ",
          hours: "3",
          coreq_id: 121,
        },
        {
          id: 139,
          title: "Web Application Development",
          descr:
            "Structured approach to building and maintaining dynamic and interactive Web sites. Emphasis on application, design and development. Students gain a thorough understanding of server-side scripting, form validation, and Web-site security while advancing their understanding of database design principles and SQL. Students create a database-driven Website. ",
          hours: "3",
          coreq_id: 122,
        },
        {
          id: 140,
          title: "Information Systems Analysis",
          descr:
            "An introduction to processes and methods used for identifying and documenting information systems requirements and developing systems specifications. Topics include the systems development life cycle, analysis tools such as flowcharts and data flow diagrams, development life cycle, and techniques for effective written communication. Case studies are used. ",
          hours: "3",
          coreq_id: 123,
        },
        {
          id: 141,
          title: "Human-Computer Interfaces",
          descr:
            "Human-computer interaction for information technology professionals. Analysis and design of systems from the point of view of HCI. ",
          hours: "3",
          coreq_id: 125,
        },
        {
          id: 142,
          title: "Topics in Information Technology",
          descr:
            "Topics of current interest in information technology not covered in existing courses. May be repeated under different subtitles. ",
          hours: "3",
          coreq_id: 126,
        },
        {
          id: 143,
          title: "IT Resource Planning and Management",
          descr:
            "This course will explore the management and strategic alignment of IT resources within the organization. Topics include IT strategy, IT alignment, planning and managing technology resources and integration of emerging technology into the organization.",
          hours: "3",
          coreq_id: 127,
        },
        {
          id: 144,
          title: "Seminar in Information Technology",
          descr: "Research and discussion of selected topics in Information Technology. Oral presentation required. ",
          hours: "1",
          coreq_id: 129,
        },
        {
          id: 145,
          title: "Internship in Information Technology",
          descr:
            "Academic training and practical experience through work in a private company or public agency. Faculty supervision and evaluation of all study and on-site activity. Written experience report and oral presentation required.",
          hours: "1 to 3",
          coreq_id: 130,
        },
        {
          id: 146,
          title: "Honors Work in Information Technology",
          descr: "Individual study for honors students. ",
          hours: "2 to 3",
          coreq_id: 131,
        },
        {
          id: 147,
          title: "Orientation to Computer Science",
          descr:
            "Introduction to the field of computer science. Overview of computer science disciplines, application areas, and career options. Presentations in the department’s research areas. This course is a required course for all majors and minors in computer science.",
          hours: "1",
          coreq_id: 132,
        },
        {
          id: 148,
          title: "Computing Competencies for College and the Workplace",
          descr:
            "College-level computing education for all majors focusing on software skills employers most frequently seek, technology-related social, legal and ethical issues, and foundational understanding of current digital technologies for efficient organization and effective communication. Students will choose one additional topic of interest such as business or graphic design. ",
          hours: "3",
          coreq_id: 133,
        },
        {
          id: 150,
          title: "Introduction to Computer Programming",
          descr:
            "An introduction to programming in a high-level language. Algorithms, computer systems, data representation, survey of computer applications, elementary programming techniques, debugging and verification of programs. The language to be used will be specified in the schedule of classes. Recommended primarily for non computer science majors.",
          hours: "3",
          coreq_id: 135,
        },
        {
          id: 151,
          title: "Programming Concepts I",
          descr:
            "Problem-solving methods and algorithms in a modern high-level programming language. Introduces classes and objects; control structures; arrays; characters and strings. Emphasis on programming style and the design, coding, and testing of complete programs.",
          hours: "4",
          coreq_id: 136,
        },
        {
          id: 152,
          title: "Introduction to Computer Science",
          descr:
            "Problem solving methods and algorithms in a modern high-level programming language. Introduces one or more programming environments. Emphasis on a programming style and the design, coding, and testing of complete programs. Recommended primarily for computer science majors. ",
          hours: "4",
          coreq_id: 137,
        },
        {
          id: 153,
          title: "Discrete Mathematical Structures",
          descr:
            "Introduction to discrete mathematics applicable to computer science. Propositional and predicate logic, basic proof techniques, set algebra and Boolean algebra, recursion and induction, and introductory graphs and combinatorics. ",
          hours: "3",
          coreq_id: 138,
        },
        {
          id: 154,
          title: "Fundamentals of Cybersecurity",
          descr:
            "Provide students with familiarization and basic, high-level understanding of the fundamental concepts of cybersecurity. Provide students with the basic security design principles that are needed to create systems that are worthy of being trusted. Provide students with familiarization and basic, high-level understanding of the components in an IT system and the roles of those components in system operation. Provide students with an understanding of the processes and regulations associated with the analysis/evaluation of operational systems and the authorities and processes for the approval of their operation. ",
          hours: "3",
          coreq_id: 139,
        },
        {
          id: 155,
          title: "Multimedia Systems",
          descr:
            "Introduction to technologies of the Internet. Issues in Web page design; graphics and animation; client/server concepts; collaborative computing and group work; network publishing; security and encryption; audio, video, and image compression; ethical issues and privacy; e-commence; client-side Web programming; and dynamic Web page generation.",
          hours: "3",
          coreq_id: 141,
        },
        {
          id: 157,
          title: "Computer Science II",
          descr:
            "Continuation of CSC 121 with emphasis on sorting and searching; recursion; exception and event handling; text and binary file I/O; GUIs; inheritance, interfaces, and polymorphism; and the use of software tools. Completion of a software project is required.",
          hours: "4",
          coreq_id: 142,
        },
        {
          id: 158,
          title: "Introduction to Data Structures",
          descr:
            "Study of basic data structures and their applications. Lists and trees; searching and sorting algorithms; hashing; analysis and design of efficient algorithms. ",
          hours: "4",
          coreq_id: 143,
        },
        {
          id: 159,
          title: "Computer Organization",
          descr:
            "Topics include data representation, CPU organization, I/O memory and communication, machine-level representation of programs, introduction to a modern instruction set, introduction to assembly language programming. ",
          hours: "3",
          coreq_id: 144,
        },
        {
          id: 161,
          title: "Topics in Computer Science and Technology",
          descr:
            "Topics of current interest relating to computer science or computer technology and its uses not covered in existing courses. May be repeated under a different subtitle. ",
          hours: "3",
          coreq_id: 146,
        },
        {
          id: 162,
          title: "Introduction to Artificial Intelligence",
          descr:
            "Introduction to foundational topics on Artificial Intelligence and mathematical foundation suitable for the studies of AI. Topics include modern historical perspectives of AI, intelligent agents, search algorithms, constraint satisfaction problems, knowledge representation, ethical and societal implications of AI. ",
          hours: "3",
          coreq_id: 148,
        },
        {
          id: 163,
          title: "Mobile Application Development",
          descr:
            "Concepts and technologies for developing applications on mobile devices, including mobile-platform programming, memory-management, object-oriented paradigms, model-view-controller design, mobile-centric frameworks for networking, multimedia, location-based services, and interface design. Application design, programming, and implemention for a current mobile platform. ",
          hours: "3",
          coreq_id: 149,
        },
        {
          id: 164,
          title: "Computer Animation",
          descr:
            "Basic principles of animation using 3-D computer-generated animation and basic processes for animating synthetic objects through structured exercises. Principles of designing and producing 3-D computer-generated animation through the creation of advanced motion studies. Projects focus on developing higher-level skills in model building, animation and color, and lighting. ",
          hours: "3",
          coreq_id: 150,
        },
        {
          id: 165,
          title: "Data & Machine Learning",
          descr:
            "Concepts/techniques in machine learning and multidisciplinary applications. Topics include data cleaning/transformation; data visualization; association/correlation rules; data classification and predictive modeling (such as SVMs); performance analysis and scalability; data mining with tabular, multi-dimensional and unstructured data, including text, audio, images; big-data frameworks (such as Spark, Hadoop, HIVE, Pig); and emerging themes and challenges. ",
          hours: "3",
          coreq_id: 151,
        },
        {
          id: 166,
          title: "Object-Oriented Programming and Design",
          descr:
            "Object-oriented programming with a focus on software modeling of objects, classes, methods, inheritance, interfaces, and polymorphism. Completion of a team software project is required. ",
          hours: "3",
          coreq_id: 153,
        },
        {
          id: 167,
          title: "Data Structures",
          descr:
            "Study of basic data structures and their applications: lists and trees; heaps; graph algorithms; sort and search techniques; hashing; and analysis and design of efficient algorithms. ",
          hours: "3",
          coreq_id: 154,
        },
        {
          id: 168,
          title: "Scientific Computing",
          descr:
            "Introduction to the design, application, and performance of numerical algorithms fundamental to scientific computation. Topics may include error and error propagation; matrix applications such as finding solutions to linear systems, finding eigenvalues and eigenvectors, or finding linear principal components; optimization; basic Markov modeling; Fourier processing; and curve fitting. Emphasizes relative merits and implementations of algorithms.",
          hours: "3",
          coreq_id: 155,
        },
        {
          id: 169,
          title: "Operating Systems",
          descr:
            "Study of the internal operations of operating system. Topics include: system services; CPU scheduling; multi-core scheduling; threading; memory management; virtual memory; file systems; disk scheduling; deadlock characterization, prevention, and avoidance; concurrent processes; semaphores; critical sections; synchronization.",
          hours: "3",
          coreq_id: 156,
        },
        {
          id: 170,
          title: "Computer Networks",
          descr:
            "Theory and application of inter-computer communications. Local-area and wide-area networks; data transmission and error correction; OSI and TCP/IP layering protocols; Ethernet, token ring, token bus, and other network technologies; network topologies; the client-server model; bridges and multi-protocol routers; the Internet. Applications include electronic funds transfer and distributed databases.",
          hours: "3",
          coreq_id: 157,
        },
        {
          id: 171,
          title: "Secure Programming",
          descr:
            "Foundation for programming secure software applications. Introduction to the mechanics of code exploitation, including programming principles that guard against software vulnerabilities. Considers overflows, input sanitization, password security, command injection, web application vulnerabilities, development and testing for secure software and sound security fundamentals, and core concepts in web applications and database development.",
          hours: "3",
          coreq_id: 159,
        },
        {
          id: 172,
          title: "Applied Software Security",
          descr:
            "Introduction to the development of secure software applications. Consideration of software vulnerability analysis, secure programming best practices, overflows, input sanitization, password security, command injection, database development, and web application development and vulnerabilities. Design, analysis, and implementation of a secure web application. ",
          hours: "3",
          coreq_id: 160,
        },
        {
          id: 173,
          title: "Cyber Operations",
          descr:
            "Introduction to cyber operations concepts, with specific focus on the computing aspects. Topics include: Basics of cyber operations including an overview of cybercrime; malware analysis; intrusion detection and prevention; web application security; cybersecurity ethics. ",
          hours: "3",
          coreq_id: 161,
        },
        {
          id: 174,
          title: "Formal Languages and Computability",
          descr:
            "An introduction to theoretical computer science. Topics include regular expression and finite state concepts; basic automata theory; formal grammars and languages; computability; Turing machines; elementary recursive function theory. ",
          hours: "3",
          coreq_id: 163,
        },
        {
          id: 175,
          title: "Client-Side Web Development",
          descr:
            "Development of applications for the World Wide Web focusing on client-side languages; introduction to current principles, standards, and best practice in website design, usability, accessibility, and management through project-based skills; development in HTML5, CSS, JavaScript, JQuery, AJAX, RESTful web services; assessment of current frameworks.",
          hours: "3",
          coreq_id: 164,
        },
        {
          id: 176,
          title: "Visual Design for Multi-Media",
          descr:
            "Combined studio/lecture course that examines technologies and basic principles of the Internet specific to visual interface design and interactivity. Topics covered include technical, functional, and aesthetic issues related to basic graphic design and page design principles; site planning and implementation; graphic production using software and designing for user experience. ",
          hours: "3",
          coreq_id: 165,
        },
        {
          id: 177,
          title: "Computer Graphics",
          descr:
            "Introduction to geometric modeling for graphic programming. Topics include transformations for modeling, viewing, and projection; geometric modeling of curves and surfaces; hidden-surface removal; clipping; graphical buffers; material simulation; texture mapping; and lighting. ",
          hours: "3",
          coreq_id: 166,
        },
        {
          id: 178,
          title: "Design and Analysis of Algorithms",
          descr:
            "Algorithm design paradigms such as divide and conquer, greedy, and dynamic programming; techniques for algorithm analysis, such as asymptotic notations and estimates, as well as time/space trade-offs. Topics may include sorting, searching, scheduling, string matching, graph algorithms, amortized analysis, and computational geometry. ",
          hours: "3",
          coreq_id: 167,
        },
        {
          id: 179,
          title: "Professional and Ethical Issues in Computing",
          descr:
            "Professional and ethical issues arising from the impact of computer science and related technologies on society. Topics include ethical issues, obligations of professional practice, privacy and security, intellectual property, work and health issues, and the impact of emerging technologies. Students give both oral and written presentations and discuss case studies. ",
          hours: "3",
          coreq_id: 168,
        },
        {
          id: 180,
          title: "Advanced Artificial Intelligence",
          descr:
            "Advanced principles related to the field of Artificial Intelligence. Applications of AI in game trees, decision systems, artificial neural networks, Bayesian networks, intelligent multi-agent systems and fundamentals of reinforcement learning. ",
          hours: "3",
          coreq_id: 169,
        },
        {
          id: 181,
          title: "Artificial Intelligence",
          descr:
            "Introduction to key concepts and applications of artificial intelligence. Knowledge representation; state space searching; heuristic search; expert systems. Biologically inspired computing techniques such as neural networks, fuzzy logic, and genetic algorithms. Implementation of concepts and techniques. ",
          hours: "3",
          coreq_id: 170,
        },
        {
          id: 182,
          title: "Game Development",
          descr:
            "Design and implementation of computer games, including design, modeling, and animation of meshes for game characters and environments using 3D software, scene and object representation, graphics pipeline, collision detection, picking, graphics optimization, basic physics and Artificial Intelligence for games, and code modifications and additions for a game engine. ",
          hours: "3",
          coreq_id: 171,
        },
        {
          id: 183,
          title: "Computer Security",
          descr:
            "Comprehensive technical study of computer security, with specific focus on the computing aspects. Basics of computer security including an overview of threat, attack, and adversary models; essentials of cryptography; system security in practice; trusted system design; public policy issues including legal and privacy issues; network and database security overview. ",
          hours: "3",
          coreq_id: 172,
        },
        {
          id: 184,
          title: "Digital Visual Effects",
          descr:
            "Exploration of digital image and video representation and manipulation for motion-picture visual effects. Topics include image storage and compression, film and video formats, compositing, filtering, scripting for graphics and visual effects, photorealistic lighting and rendering, virtual cinematography, camera tracking, and particle effects. ",
          hours: "3",
          coreq_id: 174,
        },
        {
          id: 185,
          title: "Deep Machine Learning",
          descr:
            "Advanced topics in deep machine learning and exploration of innovative paradigms that illuminate the future of machine learning. Capstone format emphasizing experiential approaches to solving real problems with deep machine learning.",
          hours: "3",
          coreq_id: 175,
        },
        {
          id: 186,
          title: "Natural Language Processing",
          descr:
            "Introduction to natural language processing, computational linguistics, and speech recognition. Exploration of both symbolic and stochastic algorithms for processing human languages. Topics include parsing, part of speech tagging, semantic representation, pragmatic analysis, discourse structure, machine translation, n-gram statistical models, Hidden Markov Models, and other stochastic techniques. ",
          hours: "3",
          coreq_id: 176,
        },
        {
          id: 187,
          title: "Programming Languages",
          descr:
            "Comparative study of programming languages from both theoretical and applied viewpoints. Typical issues include syntax and semantics, scope and binding times, storage allocation, parameter-passing techniques, control structures, run-time representation of programs and data. Detailed examples from the imperative, functional, parallel, object-oriented, and logical programming paradigms. ",
          hours: "3",
          coreq_id: 177,
        },
        {
          id: 188,
          title: "Parallel Computing",
          descr:
            "Implementation of scientific algorithms in parallel. Use of shared-memory, distributed-memory, and multicore technologies. Study of techniques for improved performance and issues related to speedup and slowdown. ",
          hours: "3",
          coreq_id: 178,
        },
        {
          id: 189,
          title: "Computer System Architecture",
          descr:
            "Advanced study of the architecture of computer systems. Common processor organizations, hardwired and micro-programmed control, input/output subsystem; bus control; programmed I/O; DMA and interrupts; memory subsystem; interleaved, cache and associative memory; cache design; instruction pipelines, arithmetic pipel",
          hours: "3",
          coreq_id: 179,
        },
        {
          id: 190,
          title: "Grid Computing",
          descr:
            "Grid computing software components, standards, web services, security mechanisms, schedulers, resource brokers, workflow editors, grid portals, and grid computing applications. ",
          hours: "3",
          coreq_id: 180,
        },
        {
          id: 191,
          title: "Software Engineering",
          descr:
            "Study of the design and production of large and small software systems. Topics include systems engineering, software life-cycle and characterization, use of software tools. Substantial software project required. ",
          hours: "3",
          coreq_id: 181,
        },
        {
          id: 192,
          title: "Software Assurance",
          descr:
            "Introduction to quality assurance, reliability, security in software engineering. Topics include quality/security requirements and specifications; design and code review; techniques for static and dynamic analysis of software; software metrics; advanced testing techniques; reliability growth modeling. Emphasis on software security engineering provided, including threat modeling, secure design principles, secure development processes. Course provides practical application of strategies and principles learned. ",
          hours: "3",
          coreq_id: 182,
        },
        {
          id: 193,
          title: "Computer Vision",
          descr:
            "Analysis of how real-world information can be computationally extracted from visual data. Foundation in digital image formation and processing, feature extraction and matching, and classification. Examination of a focused area of computer vision in-depth and analysis of classical and learning-based methods for performing a specific task such as object/scene recognition and retrieval, video tracking, or 3D reconstruction. ",
          hours: "3",
          coreq_id: 183,
        },
        {
          id: 194,
          title: "Database Design and Implementation",
          descr:
            "Introduction to data base concepts, data independence, logical and physical views of data base systems. Data models: hierarchical, network, and relational. Data description languages, query functions, relational algebra. Substantial software project required. ",
          hours: "3",
          coreq_id: 184,
        },
        {
          id: 195,
          title: "Compiler Construction",
          descr:
            "Study of programming language translation. Organization of a compiler including symbol tables, lexical scan, syntax scan, object code generation, error diagnostics, object code optimization, and overall design; compilation of simple expressions and statements; use of compiler writing tools. Substantial software project required. ",
          hours: "3",
          coreq_id: 185,
        },
        {
          id: 196,
          title: "Software Practicum",
          descr:
            "Capstone experience that applies skills acquired across the CSC major. Students define, implement, and test a software system created for an external customer. Software engineering concepts and techniques applied in a team project with a sizable software deliverable. All aspects of the software lifecycle are implemented. ",
          hours: "3",
          coreq_id: 186,
        },
        {
          id: 197,
          title: "Virtual Reality",
          descr:
            "Study of the fundamentals of virtual reality (VR) and virtual environment technology (VET). Topics include human perception and cognition; scientific research, training, and industry; building good user experiences; and other topics. Students are required to develop a VR-based application as a final project and paper. ",
          hours: "3",
          coreq_id: 187,
        },
        {
          id: 198,
          title: "Artificial Intelligence for Cybersecurity",
          descr:
            "Study of Artificial Intelligence (AI) and Machine Learning (ML) to solve cybersecurity problems. Coverage of fundamental and advanced knowledge in applying AI and ML techniques to real-world datasets to learn about Cyber Threat Intelligence (CTI), malware analysis, and classification, etc. ",
          hours: "3",
          coreq_id: 188,
        },
        {
          id: 199,
          title: "Advanced Cryptography and Blockchain",
          descr:
            "Exploration of important developments in modern cryptography.  Considers Diffie-Hellman key exchange, Merkle trees, El-Gamal encryption, fully homomorphic encryption, cryptocurrencies, including distributed consensus, blockchains, smart contracts and applications. ",
          hours: "3",
          coreq_id: 190,
        },
        {
          id: 200,
          title: "Server-Side Web Development",
          descr:
            "Hands-on development of dynamic web applications via server-side languages and corresponding database APIs; implementation of industry best practices regarding data; secure authentication; digital certificates; session-handling; introduction to cryptography and e-commerce. Practical experience with form validation and website security using database principles and query techniques. ",
          hours: "3",
          coreq_id: 191,
        },
        {
          id: 201,
          title: "Malware Analysis",
          descr:
            "Fundamentals of basic malware analysis through static and behavioral analysis malicious software. Coverage of the compilation process that takes human readable code to compiled machine readable code and to numerous tools used for malware analysis. ",
          hours: "3",
          coreq_id: 192,
        },
        {
          id: 202,
          title: "Reverse Engineering",
          descr:
            "Coverage of the binary analysis skills necessary to discover the true nature of any executable binary. Examination of the high-level language constructs, including branching statements, looping functions and network socket code, critical to performing a thorough and professional reverse engineering analysis of a binary file. ",
          hours: "3",
          coreq_id: 193,
        },
        {
          id: 203,
          title: "Hardware Security",
          descr:
            "Overview of computer hardware security. Topics include side channel attacks, physical unclonable functions, TRNG, supply chain management, hardware Trojans, the power grid, and smart cities. ",
          hours: "3",
          coreq_id: 194,
        },
        {
          id: 204,
          title: "Generative Deep Learning",
          descr:
            "Introduction to deep learning tools for generation of images, text data, music, and autonomous vehicle controls. Explores the difference between discriminative models and generative models. Topics include the design and construction of models using autoencoders, variational autoencoders, generative and adversarial networks. Requires a generative capstone project. ",
          hours: "3",
          coreq_id: 195,
        },
        {
          id: 205,
          title: "Topics in Computer Science",
          descr:
            "Topics of current interest in computer science not covered in existing courses. May be repeated under a different subtitle. ",
          hours: "3",
          coreq_id: 196,
        },
        {
          id: 206,
          title: "Seminar in Computer Science",
          descr: "Research and discussion of selected topics in computer science. Oral presentation required.",
          hours: "1",
          coreq_id: 198,
        },
        {
          id: 207,
          title: "Internship in Computer Science",
          descr:
            "Academic training and practical experience through work in a private company or public agency. Faculty supervision and evaluation of all study and on-site activity. Open to students of junior or senior standing who have been approved by the faculty supervisor, department chair, and dean. Written experience report and oral presentation required. ",
          hours: "1 to 3",
          coreq_id: 199,
        },
        {
          id: 208,
          title: "Honors Work in Computer Science",
          descr: "Individual study for honors students. ",
          hours: "2 to 3",
          coreq_id: 200,
        },
        {
          id: 209,
          title: "Fundamentals of Cybersecurity",
          descr:
            "Provide students with familiarization and basic, high-level understanding of the fundamental concepts of cybersecurity. Provide students with the basic security design principles that are needed to create systems that are worthy of being trusted. Provide students with familiarization and basic, high-level understanding of the components in an IT system and the roles of those components in system operation. Provide students with an understanding of the processes and regulations associated with the analysis/evaluation of operational systems and the authorities and processes for the approval of their operation. ",
          hours: "3",
          coreq_id: 139,
        },
        {
          id: 210,
          title: "Cyber Policy, Legal, Ethics, Compliance",
          descr:
            "Exploration of the intersection between cybersecurity and policy, law, ethics, privacy, compliance, and law enforcement. Examination of applicable laws and policies related to cyber defense. Topics include privacy and the internet, the effectiveness of cybersecurity applications in preventing crime and abuse, and the application of ethical concepts in cybersecurity. ",
          hours: "3",
          coreq_id: 201,
        },
        {
          id: 211,
          title: "Cryptography and Data Security",
          descr:
            "Introduction to data security, including authenticity, anonymity, and integrity. Consideration of encryption/decryption, sender authentication, data integrity, non-repudiation, attack classification, secret key (symmetric) and public key (asymmetric) cryptography. ",
          hours: "3",
          coreq_id: 202,
        },
        {
          id: 212,
          title: "Secure Programming Foundations",
          descr:
            "Exploration of programming and machine constructs behind code vulnerabilities and best practices for developing secure programs. Introduction to low-level code mechanics in C and assembly language frequently leveraged in code exploitation. Study of programming principles that guard against software vulnerabilities, including pointers, hardware control, overflows, input sanitization, data obfuscation, secure design, and static analysis. ",
          hours: "3",
          coreq_id: 203,
        },
        {
          id: 213,
          title: "Secure Database Management",
          descr:
            "Introduction to database security theories and applications. Consideration of threats in database systems and applications of security concepts. Topics include data integrity and authentication, and information storage security. ",
          hours: "3",
          coreq_id: 204,
        },
        {
          id: 214,
          title: "Cybersecurity Program Management",
          descr:
            "Explores methods used to raise general security awareness. Reviews current industry practices, contingency planning, and systems specific plans (e.g., change management). Examines the roles involved in planning and managing security. Students develop necessary skills to adapt policies to achieve confidentiality, integrity, and availability of organizational assets and data.",
          hours: "3",
          coreq_id: 205,
        },
        {
          id: 215,
          title: "Systems Security",
          descr: "The process of ensuring confidentiality, integrity, and availability of the operating system.",
          hours: "3",
          coreq_id: 206,
        },
        {
          id: 216,
          title: "Computer and Mobile Forensics",
          descr:
            "Introduction to the concepts in computer and forensics investigations. Recovery and analysis of digital evidence using industry best practices and standard commercial and open source tools. Development of comprehensive investigative forensic reports. Coverage of the legal and ethical considerations of computer crime investigations. ",
          hours: "3",
          coreq_id: 207,
        },
        {
          id: 217,
          title: "Cyber Operations",
          descr:
            "Introduction to cyber operations concepts, with specific focus on the computing aspects. Topics include: Basics of cyber operations including an overview of cybercrime; malware analysis; intrusion detection and prevention; web application security; cybersecurity ethics. ",
          hours: "3",
          coreq_id: 161,
        },
        {
          id: 218,
          title: "Computer Security",
          descr:
            "Comprehensive technical study of computer security, with specific focus on the computing aspects. Basics of computer security including an overview of threat, attack, and adversary models; essentials of cryptography; system security in practice; trusted system design; public policy issues including legal and privacy issues; network and database security overview. ",
          hours: "3",
          coreq_id: 172,
        },
        {
          id: 219,
          title: "Cloud Security",
          descr:
            "Introduction to cloud security architecture and exploration of the guiding security design principles, design patterns, industry standards, and associated technologies. Study of regulatory compliance requirements critical to the design, implementation, delivery, and management of secure cloud-based services. ",
          hours: "3",
          coreq_id: 208,
        },
        {
          id: 220,
          title: "SOC Operations",
          descr:
            "Introduction to security operations centers (SOC). Study of processes used for operations such as incident response, vulnerability assessment, and threat investigation. Introduction to software tools to manage SOC activities such as security information and event management (SIEM) systems, vulnerability scanners, intrusion detection systems (IDS), and intrusion prevention systems (IPS). ",
          hours: "3",
          coreq_id: 209,
        },
        {
          id: 221,
          title: "Cyber Fraud and Investigation",
          descr:
            "Investigation of cyber fraud, and the study of plans and processes for a holistic approach to preventing and mitigating fraud throughout the system lifecycle. Specific attention paid to financial fraud and the application of forensics techniques to respond to and investigate financial incidents. ",
          hours: "3",
          coreq_id: 210,
        },
        {
          id: 222,
          title: "Supply Chain Cybersecurity",
          descr:
            "Explores security issues associated with building complex systems out of third-party components; the authorities and processes for the approval of their operation; how security principles can be applied to improve security throughout the system or product lifecycle; and the basics of industrial control systems and vulnerabilities they are likely to have. ",
          hours: "3",
          coreq_id: 211,
        },
        {
          id: 223,
          title: "Cyber Risk",
          descr:
            "Introduction to risk assessment models, methodologies, and processes. Examination of how cybersecurity risks are part of an organizations’ overall risk. Study of the techniques and guidelines used to perform a cybersecurity risk assessment of a system, process, or organization and appropriate mitigations. ",
          hours: "3",
          coreq_id: 212,
        },
        {
          id: 224,
          title: "Cyber Politics",
          descr:
            "Introduction to key aspects of cyberspace’s emergence as the fifth domain of strategic warfare, the center of human communication, and an integral part of social governance. Study of cyber politics as an area related to political philosophy, international economics, and realpolitik in diplomacy and warfare. ",
          hours: "3",
          coreq_id: 213,
        },
        {
          id: 225,
          title: "Cyber Law and Cases",
          descr:
            "Introduction to the U.S state laws, federal laws, and regulatory policies, as well as international laws that regulate cyberspace activities. Coverage of cyberspace and the legal/policy background that individuals, businesses, and governments must understand to conduct cyber actions within the limits of legal authority. ",
          hours: "3",
          coreq_id: 214,
        },
        {
          id: 226,
          title: "Certified Information Systems Security Professional",
          descr: "Study of Certified Information Systems Security Professional (CISSP) domains. ",
          hours: "3",
          coreq_id: 215,
        },
        {
          id: 227,
          title: "Certified Information Systems Auditor",
          descr: "Study of Certified Information Systems Auditor (CISA) domains.",
          hours: "3",
          coreq_id: 216,
        },
        {
          id: 229,
          title: "Topics in Cybersecurity",
          descr:
            "Topics of current interest in cybersecurity not covered in existing courses. May be repeated under different subtitles. ",
          hours: "3",
          coreq_id: 217,
        },
        {
          id: 230,
          title: "Seminar in Cybersecurity",
          descr:
            "Individual reports and group discussions of field, laboratory and/or library research on selected topics in cybersecurity. May only be taken once for credit in the major. ",
          hours: "3",
          coreq_id: 219,
        },
        {
          id: 231,
          title: "Internship in Cybersecurity",
          descr:
            "Academic training and practical experience through work in a private company or public agency. Faculty supervision and evaluation of all study and on-site activity. Written experience report and oral presentation required. ",
          hours: "3",
          coreq_id: 220,
        },
        {
          id: 232,
          title: "Honors in Cybersecurity",
          descr: "Individual study for honors students. ",
          hours: "3",
          coreq_id: 221,
        },
        {
          id: 233,
          title: "Principles of Economics-Micro",
          descr: "",
          hours: "3",
          coreq_id: 222,
        },
        {
          id: 234,
          title: "Principles of Economics-Macro",
          descr:
            "Aggregate economic analysis examining the effects of fiscal and monetary policy upon aggregate employment, income and prices at an introductory level. ",
          hours: "3",
          coreq_id: 223,
        },
        {
          id: 235,
          title: "College Writing and Reading I",
          descr:
            "Introduction to the composing process through practice in analysis and rhetoric as well as narrative and expository forms appropriate to academic writing. Students conduct research using print and online sources, document sources, and write persuasively. ",
          hours: "3",
          coreq_id: 224,
        },
        {
          id: 236,
          title: "Forensic Environmental Science",
          descr:
            "Presentation and practice of the techniques for applying scientific methods, investigative procedures, legal standards of evidence, and case preparation techniques to investigation of environmental problems. ",
          hours: "3",
          coreq_id: 102,
        },
        {
          id: 237,
          title: "Principles of Financial Management",
          descr:
            "An introduction to the finance function of business enterprise and to the analytical techniques used in making investment and financing decisions. ",
          hours: "3",
          coreq_id: 225,
        },
        {
          id: 239,
          title: "Introduction to Intelligent Systems Engineering",
          descr:
            "Interdisciplinary course that introduces students to intelligent systems, covering topics such as: how intelligent systems interact with the physical world, algorithms to transform inputs to outputs, how data are handled, binary number systems, discrete mathematics, basic logic, computer architecture and problem-solving. ",
          hours: "3",
          coreq_id: 226,
        },
        {
          id: 240,
          title: "Embedded Systems",
          descr:
            "Introduction to computer organizations, data representation, CPU organization, I/O memory and communication, implementation of a microcontroller or microprocessor embedded systems, assembly language programming, interfacing to peripherals, interrupt handling and debugging techniques. ",
          hours: "3",
          coreq_id: 227,
        },
        {
          id: 241,
          title: "Signals, Systems, and Control",
          descr:
            "Introduction to signals, discrete and continuous, and methods for examining and evaluating signals. The course examines the relationship between the time and frequency domain using Fourier and other methods. This course uses numerical methods for the exploration of signals and control systems. ",
          hours: "3",
          coreq_id: 228,
        },
        {
          id: 242,
          title: "Digital Signal Processing",
          descr:
            "Fundamentals of digital signal processing (DSP). Topics include: A/D-D/A conversion and quantization, number representations and finite wordlength effects; FIR, IIR and lattice filter structures, block diagram and equivalent structures; multi-rate DSP and filterbanks; digital filter design methods and verification; and DSP hardware architecture. ",
          hours: "3",
          coreq_id: 229,
        },
        {
          id: 243,
          title: "Systems Software",
          descr:
            "Fundamental understanding of real and virtual machines as language processor and the implementation of compilers, including the processor as an instruction interpreter. Compilers, assemblers, linkers and loaders, operating systems and virtual machines presented as systems software for program development. ",
          hours: "3",
          coreq_id: 230,
        },
        {
          id: 244,
          title: "Principles of Cyber-Physical Systems",
          descr:
            "Introduction to the architecture, design, and analysis of cyber-physical systems (CPS), including the principles of design, specification, and modeling. Explanation of core ideas related to CPS design including model-based design, distributed algorithms, system specification and verification, control theory, and real-time systems. ",
          hours: "3",
          coreq_id: 231,
        },
        {
          id: 245,
          title: "Intelligent Systems",
          descr:
            "Introduction to intelligent methods and traditional artificial intelligence techniques to include agents, expert and rule-based systems, uncertainty, symbolic learning, and soft computing. Examination of AI in systems through case studies and team projects. ",
          hours: "3",
          coreq_id: 232,
        },
        {
          id: 246,
          title: "Human-Centered Design and Engineering",
          descr:
            "Introduction to the principles and practices of human-centered design and engineering. Examination of case studies related to the development of artificial intelligence applications and appliances as well as more advanced systems such as autonomous vehicles. ",
          hours: "3",
          coreq_id: 233,
        },
        {
          id: 247,
          title: "Wireless Sensor Networks",
          descr:
            "Fundamentals of wireless sensor networks, including hardware and radio architecture through protocols and software to applications. Sensor network architectures, hardware platforms, physical layer techniques, medium access control, routing, topology control, quality of service management, localization, time synchronization, security, storage, and other advanced topics. ",
          hours: "3",
          coreq_id: 234,
        },
        {
          id: 248,
          title: "Capstone Project 1",
          descr: "First semester of a two-semester capstone course in Intelligent Systems Engineering program. ",
          hours: "3",
          coreq_id: 235,
        },
        {
          id: 249,
          title: "Capstone Project II",
          descr: "Second semester of a two-semester capstone course in Intelligent Systems Engineering program.",
          hours: "3",
          coreq_id: 236,
        },
        {
          id: 250,
          title: "Topics in Intelligent Systems Engineering",
          descr:
            "Topics of current interest in intelligent systems engineering not covered in existing courses. May be repeated under different subtitles. ",
          hours: "3",
          coreq_id: 237,
        },
        {
          id: 251,
          title: "Seminar in Intelligent Systems Engineering",
          descr:
            "Presentations on current topics in intelligent engineering education and related subjects. Speakers may come from campus, other universities, or business, industry, or government. ",
          hours: "1",
          coreq_id: 239,
        },
        {
          id: 252,
          title: "Internship in Intelligent Systems Engineering",
          descr:
            "Academic training and practical experience through work in a private company or public agency. Faculty supervision and evaluation of all study and on-site activity. Open to students of junior or senior standing who have been approved by the faculty supervisor, department chair, and dean. Written experience report and oral presentation required. ",
          hours: "3",
          coreq_id: 240,
        },
        {
          id: 253,
          title: "Honors in Intelligent Systems Engineering",
          descr: "Individual study for honors students.",
          hours: "3",
          coreq_id: 241,
        },
        {
          id: 254,
          title: "Mathematical Study Skills and Algebra Review",
          descr:
            "Designed for students not ready for MAT 111, this course prepares the student to be successful in college algebra and beyond. Topics include study, note-taking, and time management skills needed to be successful in mathematics and review of algebra. ",
          hours: "1",
          coreq_id: 242,
        },
        {
          id: 255,
          title: "College Algebra",
          descr:
            "A preparatory course for further mathematics courses. Equations and inequalities; polynomial, rational, exponential and logarithmic functions; graphs; systems of equations.",
          hours: "3",
          coreq_id: 243,
        },
        {
          id: 256,
          title: "Trigonometry",
          descr:
            "Topics from trigonometry and algebra. Includes trigonometric functions, identities and equations; zeros of polynomials, and  sequences.",
          hours: "3",
          coreq_id: 244,
        },
        {
          id: 257,
          title: "Precalculus",
          descr:
            "Functions and their inverses, exponential and logarithmic functions, polynomial and rational functions, trigonometric functions and their inverses.",
          hours: "3",
          coreq_id: 245,
        },
        {
          id: 258,
          title: "Basic Precalculus",
          descr:
            "Study of fundamental concepts of algebra, functions using graphical and algebraic approaches, and applications that are essential to the study of basic calculus. Covers linear, quadratic, polynomial, rational, radical, piecewise, composite, inverse, exponential, and logarithmic functions. ",
          hours: "3",
          coreq_id: 246,
        },
        {
          id: 259,
          title: "Basic Calculus with Applications I",
          descr:
            "Intended for majors that emphasize techniques and applications. Study of linear and nonlinear functions, differentiation with applications, Riemann sums, integration, and the Fundamental Theorem of Calculus. ",
          hours: "3",
          coreq_id: 269,
        },
        {
          id: 260,
          title: "Basic Calculus with Applications II",
          descr:
            "Intended for majors that emphasize techniques and applications. The second course in a two-course sequence. Topics to include further techniques and applications of integration, multivariable calculus, differential equations, probability, sequences and series, and trigonometric functions. ",
          hours: "3",
          coreq_id: 270,
        },
        {
          id: 261,
          title: "Precalculus: Algebra & Trigonometry",
          descr: "",
          hours: "4",
          coreq_id: 247,
        },
        {
          id: 262,
          title: "Calculus with Analytical Geometry I",
          descr:
            "Calculus of a single variable intended for students in the mathematical and natural sciences. Functions and limits; differentiation with applications including maxima and minima, related rates, and approximations; theory of integration with applications; and transcendental functions. ",
          hours: "4",
          coreq_id: 248,
        },
        {
          id: 263,
          title: "Calculus with Analytical Geometry II",
          descr:
            "The second course in a three-course sequence. Further techniques and applications of integration; infinite sequences and series; conic sections, parametrized curves and polar coordinates; and, elementary differential equations.",
          hours: "4",
          coreq_id: 249,
        },
        {
          id: 264,
          title: "Differential Equations",
          descr:
            "Theory, methods of solution, and applications of ordinary differential equations with emphasis on first and second order (linear and nonlinear) equations, and systems of first order equations. Methods used include Laplace transforms, matrices, eigenvalues and eigenvectors. Additional topics from power series solutions and numerical methods. ",
          hours: "3",
          coreq_id: 250,
        },
        {
          id: 265,
          title: "Introduction to Financial Mathematics",
          descr:
            "An introduction to the theory of interest and financial economics. This course is designed to comply with the requirements for actuarial exam FM. ",
          hours: "3",
          coreq_id: 251,
        },
        {
          id: 266,
          title: "Introduction to Management Information Systems",
          descr:
            "This course is designed to introduce students to the impacts of information systems on the firm, industry, society, and the economy. The management of the information resource and issues related to accessing, processing, and distributing information within a business context are emphasized. Students will analyze the role of information systems in reaching organizational objectives including communication, collaboration, performance improvement and strategy implementation. Skill-based learning will reinforce strategic information systems concepts.",
          hours: "3",
          coreq_id: 252,
        },
        {
          id: 267,
          title: "Web Page Development",
          descr:
            "Study of the design and creation of web pages that support traditional screens, tablets, and smart devices. Topics include page structure, human-computer interface design, style sheets, reusability, and design concepts. Best industry practices, such as client-side scripting languages and Search Engine Optimization (SEO) techniques, will also be considered. ",
          hours: "3",
          coreq_id: 117,
        },
        {
          id: 269,
          title: "Management of Database Systems",
          descr:
            "Study of the design and administration of database systems in a business environment. The relational model is used along with database management software to facilitate the communication and distribution of data and its conversion into information, with an emphasis on sound design principles. Topics include entity-relationship modeling, normalization, and the structured query language (SQL). ",
          hours: "3",
          coreq_id: 254,
        },
        {
          id: 270,
          title: "Computer Networks",
          descr:
            "Theory and application of inter-computer communications. Local-area and wide-area networks; data transmission and error correction; OSI and TCP/IP layering protocols; Ethernet, token ring, token bus, and other network technologies; network topologies; the client-server model; bridges and multi-protocol routers; the Internet. Applications include electronic funds transfer and distributed databases.",
          hours: "3",
          coreq_id: 157,
        },
        {
          id: 271,
          title: "Information Assurance",
          descr:
            "This course provides students with an applied learning experience with the cybersecurity area of information assurance. This course starts with an overview of common standards related to information assurance. It also provides students with an understanding of the rules, regulations and issues related to compliance with applicable laws and regulations. Following an 8-week overview of these topics, students are then paired with real-world cybersecurity professionals as mentors to complete an applied learning experience that discusses cases and maps relevant aspects of the cases to the NICE (National Initiative for Cybersecurity Education) framework",
          hours: "3",
          coreq_id: 255,
        },
        {
          id: 272,
          title: "Business Telecommunications and Enabling Technologies",
          descr:
            "A study of the role of telecommunications in businesses as well as emerging networking/security technologies that will enable and potentially change how organizations conduct business in a networked economy. The course covers telecommunication topics such as the network layers, architecture, design, and use of telecommunications technologies and systems (with an emphasis on local area networks). The course also focuses on various emerging technologies (e.g., cloud) and the potential business impact of these technologies. ",
          hours: "3",
          coreq_id: 256,
        },
        {
          id: 273,
          title: "Network Security",
          descr:
            "Provide students with knowledge of the concepts used in defending a network, and the basic tools and techniques that can be taken to protect a network and communication assets from cyber threats.  Provide students with the knowledge to administer and maintain a comprehensive enterprise security infrastructure.  Provide students with an understanding of common security architectures for the protection of information systems and data.",
          hours: "3",
          coreq_id: 268,
        },
        {
          id: 274,
          title: "Windows Systems Administration",
          descr:
            "Provides students with skill to perform basic operations involved in system administration of Microsoft Windows based systems. Provides students with the ability to apply methods such as managing applications, services, and network ports to improve the robustness of operating systems.  ",
          hours: "3",
          coreq_id: 257,
        },
        {
          id: 275,
          title: "Ethical Hacking",
          descr:
            "Provide students with methods of discovering ways of exploiting vulnerabilities to gain access to a system.  Provide students with an understanding of common security architectures for the protection of information systems and data.  Advance students’ knowledge of penetration testing, network vulnerabilities, and ethical hacking. ",
          hours: "3",
          coreq_id: 258,
        },
        {
          id: 276,
          title: "Digital Forensics",
          descr:
            "This course is an introduction to computer forensic concepts, with emphasis on computer forensic methods and best practices. Provide students with the skills to apply forensics techniques throughout an investigation life cycle with a focus on complying with legal requirements.  Provide students with the ability to apply forensics techniques to investigate and analyze a host in a network.",
          hours: "3",
          coreq_id: 267,
        },
        {
          id: 277,
          title: "Information Systems Analysis",
          descr:
            "An introduction to processes and methods used for identifying and documenting information systems requirements and developing systems specifications. Topics include the systems development life cycle, analysis tools such as flowcharts and data flow diagrams, development life cycle, and techniques for effective written communication. Case studies are used. ",
          hours: "3",
          coreq_id: 123,
        },
        {
          id: 278,
          title: "Introduction to Coastal Management",
          descr:
            "Interdisciplinary study of human impact on coastal environments and organisms. Topics include the physical and biotic settings of worldwide coastal regions, principles of coastal management, current topics in coastal management, and analysis of potential solutions to coastal problems. ",
          hours: "4",
          coreq_id: 100,
        },
        {
          id: 279,
          title: "General Physics I",
          descr:
            "First semester of a two semester calculus-based introduction to the fundamental principles of physics for the physical and mathematical sciences. Topics include kinematics, Newtonian statics and dynamics, gravitation, oscillations, and mechanical waves. ",
          hours: "4",
          coreq_id: 259,
        },
        {
          id: 280,
          title: "General Physics II",
          descr:
            "Second semester of a two semester calculus-based introduction to the fundamental principles of physics for the physical and mathematical sciences. Topics include electric and magnetic fields, circuits, Maxwell’s equations, electromagnetic waves, and optics. ",
          hours: "4",
          coreq_id: 260,
        },
        {
          id: 281,
          title: "Analog Circuits",
          descr:
            "Study of passive (resistors, capacitors, inductors) and active (diodes, transistors) components in AC and transient circuits, and integrated circuits utilizing them; skills such as soldering, splicing, and component testing. Culminates in the design and construction of a functional electronic device. ",
          hours: "3",
          coreq_id: 261,
        },
        {
          id: 282,
          title: "General Psychology",
          descr: "Principles of psychology with emphasis on scientific methods used in studying human behavior. ",
          hours: "3",
          coreq_id: 262,
        },
        {
          id: 283,
          title: "Brain and Behavior",
          descr:
            "An introductory survey of the functional anatomy of the nervous system and the roles which various neural systems play in normal and abnormal behavior. ",
          hours: "3",
          coreq_id: 263,
        },
        {
          id: 284,
          title: "Introduction to Statistics",
          descr:
            "Methods of data collection; numerical and graphical analyses of univariate and bivariate data; axioms of probability; conditional probability; independence; distributions of random variables; introduction to confidence intervals and hypothesis testing; simple linear regression and correlation; use of statistical software to analyze data and simulate random variables.",
          hours: "3",
          coreq_id: 264,
        },
        {
          id: 285,
          title: "Probability and Statistics",
          descr:
            "Discrete and continuous random variables and probability distributions; mathematical expectation and variance; sampling distributions and central limit theorem; introduction to the theory of estimation and hypothesis testing. ",
          hours: "3",
          coreq_id: 265,
        },
        {
          id: 286,
          title: "Organic Chemistry II",
          descr:
            "Reactions and reaction mechanisms of organic compounds. A ‘C’ or better in CHM 212 is required to take certain advanced courses in chemistry. ",
          hours: "3",
          coreq_id: 271,
        },
        {
          id: 287,
          title: "Organic Chemistry Laboratory II",
          descr:
            "Reactions of organic compounds and the use of spectroscopic methods in the laboratory. This course is the lab for CHM 212",
          hours: "1",
          coreq_id: 271,
        },
        {
          id: 288,
          title: "Elementary College Physics I",
          descr:
            "First semester of a two semester algebra-based introduction to the fundamental principles of physics. Topics include kinematics, Newtonian statics and dynamics, gravitation, oscillations, and mechanical waves.",
          hours: "0 or 4",
          coreq_id: 272,
        },
        {
          id: 289,
          title: "Elementary College Physics II",
          descr:
            "Second semester of a two semester algebra-based introduction to the fundamental principles of physics. Topics include electric and magnetic fields, circuits, electromagnetic waves, and optics.",
          hours: "4",
          coreq_id: 273,
        },
      ],
      {}
    ),
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("Courses", {});
  },
};
