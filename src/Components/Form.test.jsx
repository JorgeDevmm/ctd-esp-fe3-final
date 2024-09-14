import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Form from "./Form";
import * as languageUtils from "../Utils/languageUtils"; // Import everything as languageUtils

// Partially mock the module to override specific functions
vi.mock("../Utils/languageUtils", async () => {
    const originalModule = await vi.importActual("../Utils/languageUtils");
    return {
        ...originalModule, // Keep the original module
        getCurrentLanguage: vi.fn((language) => {
            return originalModule.Languages.find((la) => la.key === language);
        }),
        messageComplete: vi.fn((language, name) => {
            const { messageStart, messageEnd } = originalModule.Languages.find(
                (la) => la.key === language
            ).words;
            return `${messageStart}${name}${messageEnd}`;
        }),
        languageOptions: vi.fn(() => {
            return originalModule.Languages.map((language) => ({
                value: language.key,
                label: language.language,
            }));
        }),
        defaultOption: vi.fn((language) => {
            const filtered = originalModule.Languages.find((la) => la.key === language);
            return { value: filtered.key, label: filtered.language };
        }),
    };
});

// Mocking framer-motion to avoid animations in tests
vi.mock("framer-motion", () => ({
    motion: {
        form: (props) => <form {...props} />,
    },
}));

describe("Form Component - Language tests", () => {
    it("renders form with English labels by default", () => {
        render(<Form theme="light" language="EN" />);

        // Ensure form elements are present with English labels
        expect(screen.getByLabelText("Full Name:")).toBeInTheDocument();
        expect(screen.getByLabelText("Email:")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    });

    it("renders form with Spanish labels when language is set to ES", () => {
        render(<Form theme="light" language="ES" />);

        // Ensure form elements are present with Spanish labels
        expect(screen.getByLabelText("Nombre Completo:")).toBeInTheDocument();
        expect(screen.getByLabelText("Correo Electrónico:")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();
    });

    it("renders form with Portuguese labels when language is set to ES", () => {
        render(<Form theme="light" language="PT" />);

        // Ensure form elements are present with Spanish labels
        expect(screen.getByLabelText("Nome Completo:")).toBeInTheDocument();
        expect(screen.getByLabelText("E-mail:")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();
    });

    it("renders form with Italian labels when language is set to ES", () => {
        render(<Form theme="light" language="IT" />);

        // Ensure form elements are present with Spanish labels
        expect(screen.getByLabelText("Nome Completo:")).toBeInTheDocument();
        expect(screen.getByLabelText("E-mail:")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Invia" })).toBeInTheDocument();
    });
})

describe("Form Component check messages", () => {

    it("displays error messages for invalid inputs in English", () => {
        render(<Form theme="light" language="EN" />);

        const nameInput = screen.getByLabelText("Full Name:");
        const emailInput = screen.getByLabelText("Email:");

        // Simulate invalid name input
        fireEvent.change(nameInput, { target: { value: "John" } });
        fireEvent.blur(nameInput); // trigger validation
        expect(screen.getByText("Please enter a full name (first and last)")).toBeInTheDocument();

        // Simulate invalid email input
        fireEvent.change(emailInput, { target: { value: "johnexample" } });
        fireEvent.blur(emailInput); // trigger validation
        expect(screen.getByText("Please enter an email")).toBeInTheDocument();
    });

    it("displays error messages for invalid inputs in Spanish", () => {
        render(<Form theme="light" language="ES" />);

        const nameInput = screen.getByLabelText("Nombre Completo:");
        const emailInput = screen.getByLabelText("Correo Electrónico:");

        // Simulate invalid name input
        fireEvent.change(nameInput, { target: { value: "John" } });
        fireEvent.blur(nameInput); // trigger validation
        expect(
            screen.getByText(
                "Por favor, ingrese un nombre completo (primer y último apellido)"
            )
        ).toBeInTheDocument();

        // Simulate invalid email input
        fireEvent.change(emailInput, { target: { value: "johnexample" } });
        fireEvent.blur(emailInput); // trigger validation
        expect(
            screen.getByText("Por favor, ingrese un correo electrónico válido")
        ).toBeInTheDocument();
    });

});
describe("Form Component check messages", () => {
    it("submits the form and displays success message in English", async () => {
        render(<Form theme="light" language="EN" />);

        const nameInput = screen.getByLabelText("Full Name:");
        const emailInput = screen.getByLabelText("Email:");
        const submitButton = screen.getByRole("button", { name: "Send" });

        // Simulate valid inputs
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(emailInput, { target: { value: "john@example.com" } });

        // Submit the form
        fireEvent.click(submitButton);

        // Expect the success message to be displayed
        await waitFor(() => {
            expect(screen.getByText(/Thank you John Doe/)).toBeInTheDocument();
        });
    });

    it("submits the form and displays success message in Spanish", async () => {
        render(<Form theme="light" language="ES" />);

        const nameInput = screen.getByLabelText("Nombre Completo:");
        const emailInput = screen.getByLabelText("Correo Electrónico:");
        const submitButton = screen.getByRole("button", { name: "Enviar" });

        // Simulate valid inputs
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(emailInput, { target: { value: "john@example.com" } });

        // Submit the form
        fireEvent.click(submitButton);

        // Expect the success message to be displayed
        await waitFor(() => {
            expect(
                screen.getByText(/Gracias John Doe, te contactaremos cuando antes/)
            ).toBeInTheDocument();
        });
    });

    it("submits the form and displays success message in Portuguese", async () => {
        render(<Form theme="light" language="PT" />);

        const nameInput = screen.getByLabelText("Nome Completo:");
        const emailInput = screen.getByLabelText("E-mail:");
        const submitButton = screen.getByRole("button", { name: "Enviar" });

        // Simulate valid inputs
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(emailInput, { target: { value: "john@example.com" } });

        // Submit the form
        fireEvent.click(submitButton);

        // Expect the success message to be displayed
        await waitFor(() => {
            expect(screen.getByText(/Obrigado(a) John Doe, entraremos em contato o mais breve possível por e-mail./)).toBeInTheDocument();
        });
    });



    it("submits the form and displays success message in Italian", async () => {
        render(<Form theme="light" language="IT" />);

        const nameInput = screen.getByLabelText("Nome Completo:");
        const emailInput = screen.getByLabelText("E-mail:");
        const submitButton = screen.getByRole("button", { name: "Invia" });

        // Simulate valid inputs
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(emailInput, { target: { value: "john@example.com" } });

        // Submit the form
        fireEvent.click(submitButton);

        // Expect the success message to be displayed
        await waitFor(() => {
            expect(screen.getByText(/Grazie John Doe/)).toBeInTheDocument();
        });
    });
})

