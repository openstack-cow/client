import { createContext, useCallback, useContext, useState } from "react";

type GlobalMessageType = "success" | "error";

type GlobalMessageContextType = {
    globalMessage: string;
    setGlobalMessage: (message: string) => void;
    globalMessageType: string;
    setGlobalMessageType: (messageType: GlobalMessageType) => void;
};

const GlobalMessageContext = createContext({
    globalMessage: "",
    setGlobalMessage: (_message) => { },
    globalMessageType: "",
    setGlobalMessageType: (_messageType) => { },
} satisfies GlobalMessageContextType);

export function GlobalMessageProvider({ children }: {
    children: React.ReactNode;
}) {
    const [globalMessage, setGlobalMessageReal] = useState<string>("");
    const [globalMessageType, setGlobalMessageType] = useState<GlobalMessageType>("success");

    const setGlobalMessage = useCallback((message: string) => {
        setGlobalMessageReal(message);
        setTimeout(() => {
            setGlobalMessageReal("");
        }, 5000);
    }, [setGlobalMessageReal]);

    return <GlobalMessageContext.Provider value={{
        globalMessage, setGlobalMessage, globalMessageType, setGlobalMessageType
    }}>
        {globalMessage && (
            <div
                id="signup-message"
                className={`alert ${globalMessageType === "success" ? "alert-success" : "alert-error"}`}
            >
                {globalMessage}
            </div>
        )}

        {children}
    </GlobalMessageContext.Provider>;
}

export const useGlobalMessageContext = () => useContext(GlobalMessageContext);
