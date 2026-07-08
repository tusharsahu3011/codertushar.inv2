import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";

type WelcomeEmailProps = {
    name?: string;
    email?: string;
};

export default function WelcomeEmail({
    name = "Developer",
    email,
}: WelcomeEmailProps) {
    return (
        <Html lang="en">
            <Head />

            <Preview>
                🎉 Welcome to Coder Tushar • {"You're"} officially on the waitlist.
            </Preview>

            <Body
                style={{
                    margin: 0,
                    backgroundColor: "#0b1120",
                    padding: "40px 20px",
                    fontFamily:
                        "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
                }}
            >
                <Container
                    style={{
                        maxWidth: "720px",
                        margin: "0 auto",
                        backgroundColor: "#111827",
                        border: "1px solid #293548",
                        borderRadius: "18px",
                        overflow: "hidden",
                    }}
                >
                    {/* ============================ */}
                    {/* VS CODE TITLE BAR */}
                    {/* ============================ */}

                    <Section
                        style={{
                            backgroundColor: "#1f2937",
                            borderBottom: "1px solid #293548",
                            padding: "16px 24px",
                        }}
                    >
                        <table width="100%" cellPadding={0} cellSpacing={0}>
                            <tr>
                                <td width="140">
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "12px",
                                            height: "12px",
                                            borderRadius: "999px",
                                            background: "#ff5f57",
                                            marginRight: "8px",
                                        }}
                                    />

                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "12px",
                                            height: "12px",
                                            borderRadius: "999px",
                                            background: "#febc2e",
                                            marginRight: "8px",
                                        }}
                                    />

                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "12px",
                                            height: "12px",
                                            borderRadius: "999px",
                                            background: "#28c840",
                                        }}
                                    />
                                </td>

                                <td align="center">
                                    <Text
                                        style={{
                                            color: "#cbd5e1",
                                            margin: 0,
                                            fontSize: "14px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        welcome.tsx
                                    </Text>
                                </td>

                                <td width="140" />
                            </tr>
                        </table>
                    </Section>

                    {/* ============================ */}
                    {/* HERO */}
                    {/* ============================ */}

                    <Section
                        style={{
                            padding: "48px",
                        }}
                    >
                        <Text
                            style={{
                                color: "#3b82f6",
                                margin: 0,
                                fontSize: "13px",
                                letterSpacing: "3px",
                                textTransform: "uppercase",
                                fontWeight: 700,
                            }}
                        >
                            WAITLIST CONFIRMED
                        </Text>

                        <Heading
                            style={{
                                marginTop: "18px",
                                marginBottom: "12px",
                                color: "#ffffff",
                                fontSize: "40px",
                                lineHeight: "48px",
                            }}
                        >
                            Welcome, {name}
                        </Heading>

                        <Text
                            style={{
                                color: "#9ca3af",
                                fontSize: "17px",
                                lineHeight: "30px",
                                marginBottom: "32px",
                            }}
                        >
                            Thank you for joining the{" "}
                            <strong style={{ color: "#ffffff" }}>
                                Coder Tushar
                            </strong>{" "}
                            waitlist.

                            <br />
                            <br />

                            {"You're"} officially one of our early supporters and 
                            {"you'll"} receive an email the moment
                            <strong style={{ color: "#ffffff" }}>
                                {" "}
                                codertushar.in
                            </strong>{" "}
                            launches.
                        </Text>
                        {/* ============================ */}
                        {/* STATUS CARD */}
                        {/* ============================ */}

                        <Section
                            style={{
                                backgroundColor: "#0b1220",
                                border: "1px solid #263548",
                                borderRadius: "14px",
                                padding: "24px",
                            }}
                        >
                            <Text
                                style={{
                                    margin: 0,
                                    color: "#22c55e",
                                    fontWeight: 700,
                                    fontSize: "18px",
                                }}
                            >
                                ✓ Waitlist Status
                            </Text>

                            <Hr
                                style={{
                                    borderColor: "#263548",
                                    margin: "20px 0",
                                }}
                            />

                            <table
                                width="100%"
                                cellPadding={0}
                                cellSpacing={0}
                            >
                                <tr>

                                    <td
                                        style={{
                                            padding: "12px 0",
                                            color: "#9ca3af",
                                        }}
                                    >
                                        Account Status
                                    </td>

                                    <td
                                        align="right"
                                        style={{
                                            color: "#22c55e",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Joined
                                    </td>

                                </tr>

                                <tr>

                                    <td
                                        style={{
                                            padding: "12px 0",
                                            color: "#9ca3af",
                                        }}
                                    >
                                        Launch Notification
                                    </td>

                                    <td
                                        align="right"
                                        style={{
                                            color: "#ffffff",
                                        }}
                                    >
                                        Enabled
                                    </td>

                                </tr>

                                <tr>

                                    <td
                                        style={{
                                            padding: "12px 0",
                                            color: "#9ca3af",
                                        }}
                                    >
                                        Registered Email
                                    </td>

                                    <td
                                        align="right"
                                        style={{
                                            color: "#3b82f6",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {email ?? "-"}
                                    </td>

                                </tr>

                            </table>

                        </Section>

                        <Hr
                            style={{
                                borderColor: "#293548",
                                margin: "42px 0",
                            }}
                        />

                        {/* ============================ */}
                        {/* FEATURES */}
                        {/* ============================ */}

                        <Heading
                            as="h2"
                            style={{
                                color: "#ffffff",
                                fontSize: "26px",
                                marginBottom: "28px",
                            }}
                        >
                            {"What you'll receive"}
                        </Heading>

                        <table
                            width="100%"
                            cellPadding={0}
                            cellSpacing={0}
                        >

                            <tr>

                                <td
                                    style={{
                                        padding: "18px",
                                        background: "#0b1220",
                                        border: "1px solid #293548",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            margin: 0,
                                            fontWeight: 700,
                                        }}
                                    >
                                        🗺️ Programming Roadmaps
                                    </Text>

                                    <Text
                                        style={{
                                            color: "#9ca3af",
                                            marginBottom: 0,
                                        }}
                                    >
                                        Step-by-step learning paths.
                                    </Text>
                                </td>

                            </tr>

                            <tr><td height="16" /></tr>

                            <tr>

                                <td
                                    style={{
                                        padding: "18px",
                                        background: "#0b1220",
                                        border: "1px solid #293548",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            margin: 0,
                                            fontWeight: 700,
                                        }}
                                    >
                                        💻 Real Projects
                                    </Text>

                                    <Text
                                        style={{
                                            color: "#9ca3af",
                                            marginBottom: 0,
                                        }}
                                    >
                                        Build portfolio-worthy applications.
                                    </Text>
                                </td>

                            </tr>

                            <tr><td height="16" /></tr>

                            <tr>

                                <td
                                    style={{
                                        padding: "18px",
                                        background: "#0b1220",
                                        border: "1px solid #293548",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            margin: 0,
                                            fontWeight: 700,
                                        }}
                                    >
                                        🤖 AI Resources
                                    </Text>

                                    <Text
                                        style={{
                                            color: "#9ca3af",
                                            marginBottom: 0,
                                        }}
                                    >
                                        Modern AI tools for developers.
                                    </Text>
                                </td>

                            </tr>

                            <tr><td height="16" /></tr>

                            <tr>

                                <td
                                    style={{
                                        padding: "18px",
                                        background: "#0b1220",
                                        border: "1px solid #293548",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            margin: 0,
                                            fontWeight: 700,
                                        }}
                                    >
                                        📚 Notes & Cheat Sheets
                                    </Text>

                                    <Text
                                        style={{
                                            color: "#9ca3af",
                                            marginBottom: 0,
                                        }}
                                    >
                                        Quick references for everyday coding.
                                    </Text>
                                </td>

                            </tr>

                        </table>

                        <Button
                            href="https://codertushar.in"
                            style={{
                                marginTop: "40px",
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                padding: "16px 30px",
                                borderRadius: "10px",
                                textDecoration: "none",
                                fontWeight: 700,
                                fontSize: "16px",
                            }}
                        >
                            Visit Website →
                        </Button>
                        <Hr
                            style={{
                                borderColor: "#293548",
                                margin: "48px 0 36px",
                            }}
                        />

                        {/* ============================ */}
                        {/* FINAL MESSAGE */}
                        {/* ============================ */}

                        <Text
                            style={{
                                color: "#d1d5db",
                                fontSize: "16px",
                                lineHeight: "30px",
                                marginBottom: "20px",
                            }}
                        >
                            {"You're"} now officially part of the first group of developers
                            who will experience <strong>Coder Tushar</strong> before
                            everyone else.
                        </Text>

                        <Text
                            style={{
                                color: "#9ca3af",
                                fontSize: "16px",
                                lineHeight: "30px",
                                marginBottom: "20px",
                            }}
                        >
                            {"I'm"} working hard to build a platform focused on practical
                            learning, real-world projects and developer resources that
                            actually help you become a better programmer.
                        </Text>

                        <Text
                            style={{
                                color: "#9ca3af",
                                fontSize: "16px",
                                lineHeight: "30px",
                            }}
                        >
                            Until then, keep coding and {"I'll"} let you know the moment
                            everything is ready.
                        </Text>

                        <Text
                            style={{
                                marginTop: "40px",
                                color: "#ffffff",
                                fontSize: "20px",
                                fontWeight: 700,
                            }}
                        >
                            See you on launch day 🚀
                        </Text>

                        <Text
                            style={{
                                marginTop: "8px",
                                marginBottom: 0,
                                color: "#3b82f6",
                                fontWeight: 700,
                                fontSize: "18px",
                            }}
                        >
                            — Tushar Kumar Sahu
                        </Text>

                        <Text
                            style={{
                                marginTop: "6px",
                                color: "#94a3b8",
                                fontSize: "14px",
                            }}
                        >
                            Founder • Coder Tushar
                        </Text>
                    </Section>

                    {/* ============================ */}
                    {/* FOOTER */}
                    {/* ============================ */}

                    <Section
                        style={{
                            backgroundColor: "#0f172a",
                            borderTop: "1px solid #293548",
                            padding: "24px",
                        }}
                    >
                        <table width="100%" cellPadding={0} cellSpacing={0}>
                            <tr>
                                <td>
                                    <Text
                                        style={{
                                            margin: 0,
                                            color: "#64748b",
                                            fontSize: "13px",
                                        }}
                                    >
                                        Version 1.0.0
                                    </Text>
                                </td>

                                <td align="right">
                                    <Text
                                        style={{
                                            margin: 0,
                                            color: "#22c55e",
                                            fontSize: "13px",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Waiting for Launch...
                                    </Text>
                                </td>
                            </tr>
                        </table>

                        <Hr
                            style={{
                                borderColor: "#293548",
                                margin: "22px 0",
                            }}
                        />

                        <Text
                            style={{
                                textAlign: "center",
                                color: "#94a3b8",
                                fontSize: "13px",
                                lineHeight: "24px",
                                margin: 0,
                            }}
                        >
                            You received this email because you subscribed to the
                            Coder Tushar waitlist.
                        </Text>

                        <Text
                            style={{
                                textAlign: "center",
                                color: "#64748b",
                                fontSize: "12px",
                                marginTop: "12px",
                                marginBottom: 0,
                            }}
                        >
                            © 2026 Coder Tushar. All rights reserved.
                        </Text>
                    </Section>

                </Container>
            </Body>
        </Html>
    );
}