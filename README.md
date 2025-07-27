
---

# PromptSmith - AI Prompt Generator

![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Project Description

**PromptSmith** is a sophisticated web application designed to simplify and enhance the process of generating effective prompts for Artificial Intelligence models. Built with Next.js, TypeScript, and Tailwind CSS, this frontend application provides a guided, multi-step workflow that assists users in crafting prompts for both image generation and text generation tasks.

Whether you're an AI artist looking for the perfect visual description or a writer seeking to kickstart your creative process with AI, PromptSmith aims to be your go-to tool for crafting precise and impactful prompts.

## ✨ Features

*   **Guided Prompt Generation:** A clear, step-by-step process guides users from category selection to final prompt generation.
*   **Dual Category Support:** Generate prompts specifically tailored for:
    *   **Image Generation:** Craft descriptive prompts for AI art models (e.g., Flux, Gpt-Image).
    *   **Text Generation:** Develop detailed prompts for large language models (e.g., GPT-4, Mistral).
*   **Subject-Based Input:** Start by defining a core subject or idea for your prompt.
*   **Intelligent Suggestions:** Receive curated suggestions to enrich and refine your initial prompt idea.
*   **Prompt Preview:** Get a glimpse of what the generated prompt might produce (e.g., sample text or image asset).
*   **Flexible Workflow:** Easily regenerate prompts, navigate back through steps, or start the process over.
*   **Modern UI:** A clean, responsive, and aesthetically pleasing user interface built with Tailwind CSS and Shadcn components.

## 🛠️ Technologies Used

*   **Frontend Framework:** [Next.js](https://nextjs.org/) (React framework for production)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Superset of JavaScript for type safety)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (A utility-first CSS framework)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
*   **CSS Animation:** [Tailwind CSS Animate](https://github.com/thedevdavid/tailwindcss-animate)
*   **Utility Libraries:** `clsx` and `tailwind-merge` for efficient class management.

## 🚀 Installation

To get PromptSmith up and running on your local machine, follow these steps:

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn or pnpm

### Steps

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/PromptSmith.git
    cd PromptSmith/frontend
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

3. *Note: The current code snippets do not explicitly show API calls, but a prompt generation tool typically relies on external services. The `sample-responses.ts` file currently provides static data for preview purposes.*

## 🏃 Usage

Once the dependencies are installed and environment variables are configured (if necessary), you can run the development server:

```bash
npm run dev
# or yarn dev
# or pnpm dev
```

The application will be accessible at `http://localhost:3000` (or another port if 3000 is in use).

### Navigating the Application

1.  **Select Category:** Choose between "Image Generation" or "Text Generation."
2.  **Enter Subject:** Input the core subject or theme for your prompt.
3.  **Review Suggestions:** Based on your subject, the application will provide a list of enhanced prompt suggestions. Select one that fits your needs.
4.  **View Result:** The final generated prompt will be displayed, along with a preview of what the AI might produce (e.g., sample text or an image asset placeholder).
5.  **Actions:**
    *   **Regenerate:** Generate new suggestions or a new prompt.
    *   **Start Over:** Return to the category selection step.
    *   **Back:** Go back to the previous step.

## 📁 Project Structure (Frontend)

```
PromptSmith/
├── frontend/
│   ├── .next/                  # Next.js build output (auto-generated)
│   ├── app/                    # Application routes and layouts (or pages/)
│   ├── components/
│   │   └── ui/                 # Reusable UI components (e.g., Label, Sheet from Radix UI/Shadcn)
│   ├── data/                   # Sample data, mock responses
│   │   └── sample-responses.ts # Static response examples for preview
│   ├── lib/                    # Utility functions (e.g., cn for Tailwind class merging)
│   ├── public/                 # Static assets (e.g., /assests/sun.jpg)
│   ├── constants.ts            # Application-wide constants (e.g., AI model lists)
│   ├── next-env.d.ts           # Next.js TypeScript declarations
│   ├── next.config.ts          # Next.js configuration
│   ├── tailwind.config.ts      # Tailwind CSS configuration with custom theme
│   ├── tsconfig.json           # TypeScript configuration
│   └── types.ts                # Custom TypeScript types and interfaces
├── README.md                   # This file
└── package.json                # Project dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please open an issue or submit a pull request.

---
