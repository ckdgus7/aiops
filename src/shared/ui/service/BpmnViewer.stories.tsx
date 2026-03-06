import type { Meta, StoryObj } from "@storybook/react";
import { BpmnViewer } from "./BpmnViewer";

const SAMPLE_BPMN = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
             targetNamespace=""
             id="sample-definitions">
  <process id="Process_1" isExecutable="false">
    <startEvent id="Start_1" name="시작">
      <outgoing>Flow_1</outgoing>
    </startEvent>
    <task id="Task_1" name="검토">
      <incoming>Flow_1</incoming>
      <outgoing>Flow_2</outgoing>
    </task>
    <task id="Task_2" name="승인">
      <incoming>Flow_2</incoming>
      <outgoing>Flow_3</outgoing>
    </task>
    <endEvent id="End_1" name="종료">
      <incoming>Flow_3</incoming>
    </endEvent>
    <sequenceFlow id="Flow_1" sourceRef="Start_1" targetRef="Task_1" />
    <sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Task_2" />
    <sequenceFlow id="Flow_3" sourceRef="Task_2" targetRef="End_1" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="Start_1_di" bpmnElement="Start_1">
        <dc:Bounds x="180" y="100" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="185" y="143" width="27" height="14" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
        <dc:Bounds x="280" y="78" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_2_di" bpmnElement="Task_2">
        <dc:Bounds x="450" y="78" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="End_1_di" bpmnElement="End_1">
        <dc:Bounds x="622" y="100" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="627" y="143" width="27" height="14" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="216" y="118" /><di:waypoint x="280" y="118" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="380" y="118" /><di:waypoint x="450" y="118" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="550" y="118" /><di:waypoint x="622" y="118" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

const meta: Meta<typeof BpmnViewer> = {
  title: "Service/BpmnViewer",
  component: BpmnViewer,
  decorators: [
    (Story) => (
      <div style={{ width: 800, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BpmnViewer>;

export const Default: Story = {
  args: {
    xml: SAMPLE_BPMN,
    height: 300,
  },
};

export const Tall: Story = {
  args: {
    xml: SAMPLE_BPMN,
    height: 500,
  },
};
