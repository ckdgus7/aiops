import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { MdiTab } from "./MdiTab";
import { useMdiStore } from "@/shared/model/mdi.store";

function MdiTabWithTabs() {
  const addTab = useMdiStore((s) => s.addTab);
  const setActiveTab = useMdiStore((s) => s.setActiveTab);

  useEffect(() => {
    addTab({ id: "notices", label: "공지사항", path: "/notices" });
    addTab({ id: "qna", label: "Q&A", path: "/qna" });
    addTab({ id: "domain", label: "도메인관리", path: "/ssf/domain" });
    setActiveTab("notices");
  }, [addTab, setActiveTab]);

  return <MdiTab />;
}

function MdiTabEmpty() {
  return <MdiTab />;
}

const meta: Meta<typeof MdiTab> = {
  title: "Service/MdiTab",
  component: MdiTab,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: "100%" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MdiTab>;

export const WithTabs: Story = {
  render: () => <MdiTabWithTabs />,
};

export const Empty: Story = {
  render: () => <MdiTabEmpty />,
};
