interface User {
    id: string;
    email: string;
}

type ProjectType = "software" | "hardware"

interface Project {
    name: string;
    users: User[];
    date_proposed: string;
    time: string;
    description?: string;
    github?: string;
    url?: string;
    type: ProjectType;
}