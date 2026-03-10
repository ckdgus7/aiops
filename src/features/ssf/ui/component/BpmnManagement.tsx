import { useState, type CSSProperties, type ReactNode } from "react";
import { BpmnViewer } from "@/shared/ui/service/BpmnViewer";
import { ToastEditor } from "@/shared/ui/service/ToastEditor";
import { RadioGroup } from "@/shared/ui/global/RadioGroup";
import { Button } from "@/shared/ui/global/Button";
import { FONT } from "@/shared/ui/styles";

function makeBpmnXml(tasks: { id: string; name: string }[]) {
  const startId = "StartEvent_1";
  const endSuccessId = "EndEvent_Success";
  const endRejectedId = "EndEvent_Rejected";
  const gatewayId = "Gateway_Approval";

  const taskElements = tasks.map(
    (t) =>
      `    <bpmn:userTask id="${t.id}" name="${t.name}">\n` +
      `      <bpmn:incoming>Flow_to_${t.id}</bpmn:incoming>\n` +
      `      <bpmn:outgoing>Flow_from_${t.id}</bpmn:outgoing>\n` +
      `    </bpmn:userTask>`,
  );

  const flowElements: string[] = [];
  let prevRef = startId;
  tasks.forEach((t) => {
    flowElements.push(
      `    <bpmn:sequenceFlow id="Flow_to_${t.id}" sourceRef="${prevRef}" targetRef="${t.id}"/>`,
    );
    prevRef = t.id;
  });
  flowElements.push(
    `    <bpmn:sequenceFlow id="Flow_from_${prevRef}" sourceRef="${prevRef}" targetRef="${gatewayId}"/>`,
  );
  flowElements.push(
    `    <bpmn:sequenceFlow id="Flow_yes" name="Yes" sourceRef="${gatewayId}" targetRef="${endSuccessId}"/>`,
  );
  flowElements.push(
    `    <bpmn:sequenceFlow id="Flow_no" name="No" sourceRef="${gatewayId}" targetRef="${endRejectedId}"/>`,
  );

  const xStart = 150;
  let xCursor = xStart;
  const yMain = 120;
  const shapes: string[] = [];
  const edges: string[] = [];

  shapes.push(
    `      <bpmndi:BPMNShape id="${startId}_di" bpmnElement="${startId}">\n        <dc:Bounds x="${xCursor}" y="${yMain}" width="36" height="36"/>\n      </bpmndi:BPMNShape>`,
  );
  let prevX = xCursor + 18;
  xCursor += 100;

  tasks.forEach((t) => {
    shapes.push(
      `      <bpmndi:BPMNShape id="${t.id}_di" bpmnElement="${t.id}">\n        <dc:Bounds x="${xCursor}" y="${yMain - 20}" width="120" height="80"/>\n      </bpmndi:BPMNShape>`,
    );
    edges.push(
      `      <bpmndi:BPMNEdge id="Flow_to_${t.id}_di" bpmnElement="Flow_to_${t.id}">\n        <di:waypoint x="${prevX}" y="${yMain + 18}"/>\n        <di:waypoint x="${xCursor}" y="${yMain + 18}"/>\n      </bpmndi:BPMNEdge>`,
    );
    prevX = xCursor + 120;
    xCursor += 170;
  });

  shapes.push(
    `      <bpmndi:BPMNShape id="${gatewayId}_di" bpmnElement="${gatewayId}" isMarkerVisible="true">\n        <dc:Bounds x="${xCursor}" y="${yMain - 5}" width="50" height="50"/>\n      </bpmndi:BPMNShape>`,
  );
  edges.push(
    `      <bpmndi:BPMNEdge id="Flow_from_${tasks[tasks.length - 1].id}_di" bpmnElement="Flow_from_${tasks[tasks.length - 1].id}">\n        <di:waypoint x="${prevX}" y="${yMain + 18}"/>\n        <di:waypoint x="${xCursor}" y="${yMain + 18}"/>\n      </bpmndi:BPMNEdge>`,
  );
  const gx = xCursor + 50;
  xCursor += 120;

  shapes.push(
    `      <bpmndi:BPMNShape id="${endSuccessId}_di" bpmnElement="${endSuccessId}">\n        <dc:Bounds x="${xCursor}" y="${yMain}" width="36" height="36"/>\n      </bpmndi:BPMNShape>`,
  );
  edges.push(
    `      <bpmndi:BPMNEdge id="Flow_yes_di" bpmnElement="Flow_yes">\n        <di:waypoint x="${gx}" y="${yMain + 18}"/>\n        <di:waypoint x="${xCursor}" y="${yMain + 18}"/>\n      </bpmndi:BPMNEdge>`,
  );

  shapes.push(
    `      <bpmndi:BPMNShape id="${endRejectedId}_di" bpmnElement="${endRejectedId}">\n        <dc:Bounds x="${gx - 18}" y="${yMain + 130}" width="36" height="36"/>\n      </bpmndi:BPMNShape>`,
  );
  edges.push(
    `      <bpmndi:BPMNEdge id="Flow_no_di" bpmnElement="Flow_no">\n        <di:waypoint x="${gx - 18 + 18}" y="${yMain + 45}"/>\n        <di:waypoint x="${gx - 18 + 18}" y="${yMain + 130}"/>\n      </bpmndi:BPMNEdge>`,
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_1"
  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="${startId}" name="Start">
      <bpmn:outgoing>Flow_to_${tasks[0].id}</bpmn:outgoing>
    </bpmn:startEvent>
${taskElements.join("\n")}
    <bpmn:exclusiveGateway id="${gatewayId}" name="Approved?">
      <bpmn:incoming>Flow_from_${tasks[tasks.length - 1].id}</bpmn:incoming>
      <bpmn:outgoing>Flow_yes</bpmn:outgoing>
      <bpmn:outgoing>Flow_no</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:endEvent id="${endSuccessId}" name="Completed">
      <bpmn:incoming>Flow_yes</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:endEvent id="${endRejectedId}" name="Rejected">
      <bpmn:incoming>Flow_no</bpmn:incoming>
    </bpmn:endEvent>
${flowElements.join("\n")}
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
${shapes.join("\n")}
${edges.join("\n")}
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
}

const BPMN_XML_V4 = makeBpmnXml([
  { id: "Task_Request", name: "Submit Request" },
  { id: "Task_Review", name: "Manager Review" },
  { id: "Task_Process", name: "Process Request" },
]);

const BPMN_XML_V3 = makeBpmnXml([
  { id: "Task_Request", name: "Submit Request" },
  { id: "Task_Review", name: "Team Review" },
]);

const BPMN_XML_V2 = makeBpmnXml([
  { id: "Task_Draft", name: "Draft Request" },
  { id: "Task_Review", name: "Lead Review" },
]);

const BPMN_XML_V1 = makeBpmnXml([
  { id: "Task_Init", name: "Initial Request" },
  { id: "Task_Approve", name: "Approval" },
]);

const BPMN_XML_DEFAULT = makeBpmnXml([
  { id: "Task_Request", name: "Submit Request" },
  { id: "Task_Review", name: "Manager Review" },
]);

interface HistoryEntry {
  version: string;
  status: "Deployed" | "Retired";
  user: string;
  date: string;
  bpmnXml: string;
  spec: string;
}

interface BpdItem {
  id: string;
  name: string;
  version: string;
  status: "Deployed" | "Retired";
  url: string;
  bpmnXml: string;
  spec?: string;
  history?: HistoryEntry[];
}

const BPD_ITEMS: BpdItem[] = [
  {
    id: "bpd-1",
    name: "Biz Process Diagram 01",
    version: "v 2.11.029",
    status: "Deployed",
    url: "https://aidevops.nova.com/bizasset/asset/bpd/XSyRe1g6UOdG9FChcYmacQ",
    bpmnXml: BPMN_XML_DEFAULT,
  },
  {
    id: "bpd-2",
    name: "Biz Process Diagram 02",
    version: "v 1.02.000.01",
    status: "Deployed",
    url: "https://aidevops.nova.com/bizasset/asset/bpd/XSyRe1g6UOdG9FChcYmacQ",
    bpmnXml: BPMN_XML_V4,
    spec: "v1.02.000.01 — 최신 배포 버전입니다. Submit Request → Manager Review → Process Request 3단계 승인 프로세스로 구성됩니다. 요청 제출 후 관리자 검토를 거쳐 최종 처리 단계에서 업무가 완료됩니다.",
    history: [
      {
        version: "v 1.02.000.01",
        status: "Deployed",
        user: "전우치",
        date: "2025-11-28 15:24",
        bpmnXml: BPMN_XML_V4,
        spec: "v1.02.000.01 — 최신 배포 버전입니다. Submit Request → Manager Review → Process Request 3단계 승인 프로세스로 구성됩니다. 요청 제출 후 관리자 검토를 거쳐 최종 처리 단계에서 업무가 완료됩니다.",
      },
      {
        version: "v 1.02.000",
        status: "Retired",
        user: "전우치",
        date: "2025-11-28 15:24",
        bpmnXml: BPMN_XML_V3,
        spec: "v1.02.000 — Submit Request → Team Review 2단계 프로세스입니다. 팀 단위 검토를 통한 승인 절차를 적용하여 기존 대비 검토 단계를 간소화하였습니다.",
      },
      {
        version: "v 1.01.000",
        status: "Retired",
        user: "전우치",
        date: "2025-11-28 15:24",
        bpmnXml: BPMN_XML_V2,
        spec: "v1.01.000 — Draft Request → Lead Review 구조입니다. 초안 작성 후 리드 검토를 거치는 간소화된 승인 프로세스로, 소규모 업무에 적합합니다.",
      },
      {
        version: "v 1.00.000",
        status: "Retired",
        user: "전우치",
        date: "2025-11-28 15:24",
        bpmnXml: BPMN_XML_V1,
        spec: "v1.00.000 — 최초 버전입니다. Initial Request → Approval 기본 2단계 구조로, 업무 요청과 승인의 기본 흐름을 정의합니다.",
      },
    ],
  },
];

function SectionHeader({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div style={s.sectionHeader}>
      <span style={s.sectionTitle}>{title}</span>
      {right && <div style={s.sectionRight}>{right}</div>}
    </div>
  );
}

function HistoryIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <path d="M10 4C6.13 4 3 7.13 3 11C3 14.87 6.13 18 10 18C13.87 18 17 14.87 17 11" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 7V11L13 13" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BpdIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 5C4 4.44772 4.44772 4 5 4H9L11 6H19C19.5523 6 20 6.44772 20 7V10H4V5Z" fill="white" fillOpacity="0.9" />
      <path d="M4 10H20V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V10Z" fill="white" fillOpacity="0.7" />
      <path d="M9 14H15" stroke="white" strokeOpacity="0.9" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 4V16M4 10H16" stroke="#7a5af8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ExpandIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={expanded ? "M14 12L10 8L6 12" : "M6 8L10 12L14 8"} stroke="#3f3f46" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ZoomInIcon() {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
      <circle cx="8" cy="12" r="5" stroke="#71717a" strokeWidth="1.2" />
      <path d="M12 16L15 19" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 10V14M6 12H10" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
      <circle cx="8" cy="12" r="5" stroke="#71717a" strokeWidth="1.2" />
      <path d="M12 16L15 19" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 12H10" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function FitIcon() {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
      <rect x="3" y="8" width="12" height="8" rx="1" stroke="#71717a" strokeWidth="1.2" />
      <path d="M6 8V7M12 8V7M6 16V17M12 16V17" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M12.5 3.5L14.5 5.5L5.5 14.5H3.5V12.5L12.5 3.5Z" stroke="#7a5af8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VersionBadge({ status }: { status: "Deployed" | "Retired" }) {
  const isDeployed = status === "Deployed";
  return (
    <span
      style={{
        ...s.versionBadge,
        color: isDeployed ? "#1ac057" : "#a1a1aa",
        backgroundColor: isDeployed ? "#f2fdf5" : "#fafafa",
        borderColor: isDeployed ? "#1ac057" : "#a1a1aa",
      }}
    >
      {status}
    </span>
  );
}

function BpdVersionItem({
  version,
  status,
  user,
  date,
  isFirst,
  isLast,
  active,
  onClick,
}: {
  version: string;
  status: "Deployed" | "Retired";
  user: string;
  date: string;
  isFirst: boolean;
  isLast: boolean;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div style={{ ...s.bpdVerRow, cursor: "pointer" }} onClick={onClick}>
      <div style={s.historyMark}>
        {!isFirst && <div style={s.historyLineTop} />}
        <div style={{ ...s.historyDot, backgroundColor: active ? "#7a5af8" : "#d4d4d8" }} />
        {!isLast && <div style={s.historyLineBottom} />}
      </div>
      <div style={s.bpdVerContent}>
        <span style={{ ...s.bpdVersionText, fontWeight: active ? 700 : 400 }}>{version}</span>
        <VersionBadge status={status} />
        <span style={s.bpdVerUser}>{user}</span>
        <span style={s.bpdVerDate}>{date}</span>
      </div>
    </div>
  );
}

function AssetAccordion({
  bpd,
  expanded,
  onToggle,
  selectedVersionIndex,
  onSelectVersion,
}: {
  bpd: BpdItem;
  expanded: boolean;
  onToggle: () => void;
  selectedVersionIndex: number;
  onSelectVersion: (index: number) => void;
}) {
  const history = bpd.history;
  const hasHistory = history && history.length > 0;

  const activeBpmnXml = hasHistory
    ? history[selectedVersionIndex]?.bpmnXml ?? bpd.bpmnXml
    : bpd.bpmnXml;

  const activeSpec = hasHistory
    ? history[selectedVersionIndex]?.spec ?? bpd.spec
    : bpd.spec;

  const activeVersion = hasHistory
    ? history[selectedVersionIndex]?.version ?? bpd.version
    : bpd.version;

  const activeStatus = hasHistory
    ? history[selectedVersionIndex]?.status ?? bpd.status
    : bpd.status;

  return (
    <div style={s.assetAccordion}>
      <div style={s.assetHeader}>
        <div style={s.assetIconWrap}>
          <BpdIcon />
        </div>
        <div style={s.assetInfo}>
          <div style={s.assetLabelRow}>
            <VersionBadge status={activeStatus} />
            <span style={s.assetVersion}>{activeVersion}</span>
            <span style={s.assetName}>{bpd.name}</span>
          </div>
          <div style={s.assetUrlRow}>
            <a href={bpd.url} target="_blank" rel="noopener noreferrer" style={s.assetUrl}>{bpd.url}</a>
          </div>
        </div>
        <button type="button" style={s.lvToggleBtn} onClick={onToggle}>
          <ExpandIcon expanded={expanded} />
        </button>
      </div>

      {expanded && (
        <div style={s.assetMain}>
          {hasHistory && (
            <div style={s.assetHistoryCol}>
              {history.map((h, i) => (
                <BpdVersionItem
                  key={`${h.version}-${i}`}
                  version={h.version}
                  status={h.status}
                  user={h.user}
                  date={h.date}
                  isFirst={i === 0}
                  isLast={i === history.length - 1}
                  active={i === selectedVersionIndex}
                  onClick={() => onSelectVersion(i)}
                />
              ))}
            </div>
          )}
          <div style={s.assetBpdInfo}>
            <div style={s.bpdViewerContainer}>
              <div style={s.bpdToolbar}>
                <div style={s.bpdToolbarLeft}>
                  <button type="button" style={s.bpdToolBtn}><ZoomInIcon /></button>
                  <button type="button" style={s.bpdToolBtn}><ZoomOutIcon /></button>
                  <button type="button" style={s.bpdToolBtn}><FitIcon /></button>
                </div>
              </div>
              <div style={s.bpdViewerArea}>
                <div style={s.bpdPlaceholder}>
                  <BpmnViewer xml={activeBpmnXml} key={`bpmn-${bpd.id}-${selectedVersionIndex}`} />
                </div>
              </div>
            </div>
            <div style={s.bpdSeparator} />
            {activeSpec && (
              <div style={s.bpdSpecSection}>
                <div style={s.bpdSpecHeader}>
                  <div style={s.bpdSpecLabelRow}>
                    <span style={s.fieldLabel}>BPD 명세</span>
                    <button style={s.historyBtn} type="button">
                      <HistoryIcon />
                      <span style={s.historyBtnText}>{hasHistory ? `${history.length} History` : "3 History"}</span>
                    </button>
                  </div>
                </div>
                <p style={s.bpdSpecText}>{activeSpec}</p>
                <div style={s.bpdSpecActions}>
                  <button type="button" style={s.bpdEditBtn}>
                    <EditIcon />
                    <span style={s.bpdEditBtnText}>편집</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function BpmnManagement() {
  const [expandedBpd, setExpandedBpd] = useState<string | null>("bpd-2");
  const [bpdAddOpen, setBpdAddOpen] = useState(false);
  const [bpdSpec, setBpdSpec] = useState("");
  const [bpdVersionType, setBpdVersionType] = useState("Major");
  const [bpdVersionDesc, setBpdVersionDesc] = useState("");
  const [selectedVersions, setSelectedVersions] = useState<Record<string, number>>({});

  return (
    <div style={s.bpdContainer}>
      <div style={s.bpdInner}>
        <SectionHeader title="BPD 관리" />
        <button
          type="button"
          style={s.bpdAddBtn}
          onClick={() => {
            setBpdAddOpen(!bpdAddOpen);
            if (!bpdAddOpen) {
              setBpdSpec("");
              setBpdVersionType("Major");
              setBpdVersionDesc("");
            }
          }}
        >
          <PlusIcon />
          <span style={s.bpdAddBtnText}>BPD 추가</span>
        </button>

        {bpdAddOpen && (
          <div style={s.addArea}>
            <div style={s.addFieldGroup}>
              <div style={s.addLabelRow}>
                <span style={s.addLabel}>업무(L3) BPD 명세</span>
                <div style={s.addRequiredDot} />
              </div>
              <ToastEditor value={bpdSpec} onChange={setBpdSpec} placeholder="업무(L3) BPD 명세를 입력하세요." minHeight={300} />
            </div>

            <div style={s.addFieldGroup}>
              <div style={s.addLabelRow}>
                <span style={s.addLabel}>Version 유형</span>
              </div>
              <RadioGroup
                value={bpdVersionType}
                onChange={setBpdVersionType}
                options={[
                  { label: "Major", value: "Major" },
                  { label: "Minor", value: "Minor" },
                  { label: "Patch", value: "Patch" },
                  { label: "Hot fix", value: "Hot fix" },
                ]}
                direction="horizontal"
                size="l"
              />
            </div>

            <div style={s.addFieldGroup}>
              <div style={s.addLabelRow}>
                <span style={s.addLabel}>Version 설명</span>
              </div>
              <ToastEditor value={bpdVersionDesc} onChange={setBpdVersionDesc} placeholder="설명을 입력할 수 있습니다." minHeight={300} />
            </div>

            <div style={s.addActionRow}>
              <Button size="l" variant="outlined" color="info" onClick={() => setBpdAddOpen(false)}>닫기</Button>
              <Button size="l" variant="filled" color="positive" style={{ flex: 1 }} onClick={() => setBpdAddOpen(false)}>추가</Button>
            </div>
          </div>
        )}

        <div style={s.bpdList}>
          {BPD_ITEMS.map((bpd) => (
            <AssetAccordion
              key={bpd.id}
              bpd={bpd}
              expanded={expandedBpd === bpd.id}
              onToggle={() => setExpandedBpd(expandedBpd === bpd.id ? null : bpd.id)}
              selectedVersionIndex={selectedVersions[bpd.id] ?? 0}
              onSelectVersion={(index) =>
                setSelectedVersions((prev) => ({ ...prev, [bpd.id]: index }))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  sectionHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    minHeight: 40,
    width: "100%",
  } satisfies CSSProperties,
  sectionTitle: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: "24px",
    color: "#000000",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  sectionRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
    minHeight: 20,
  } satisfies CSSProperties,
  fieldLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  historyBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: "0 4px",
  } satisfies CSSProperties,
  historyBtnText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#71717a",
  } satisfies CSSProperties,
  historyMark: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    width: 20,
    flexShrink: 0,
    position: "relative",
  } satisfies CSSProperties,
  historyLineTop: {
    width: 1,
    height: 6,
    backgroundColor: "#e4e4e7",
    flexShrink: 0,
  } satisfies CSSProperties,
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  } satisfies CSSProperties,
  historyLineBottom: {
    width: 1,
    flex: 1,
    backgroundColor: "#e4e4e7",
  } satisfies CSSProperties,
  lvToggleBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
  } satisfies CSSProperties,
  bpdContainer: {
    borderTop: "1px solid #e4e4e7",
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  bpdInner: {
    padding: "24px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  } satisfies CSSProperties,
  bpdAddBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 6,
    border: "1px solid #7a5af8",
    borderRadius: 4,
    background: "#ffffff",
    cursor: "pointer",
    alignSelf: "flex-start",
  } satisfies CSSProperties,
  bpdAddBtnText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#7a5af8",
  } satisfies CSSProperties,
  addArea: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 16,
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    width: "100%",
  } satisfies CSSProperties,
  addFieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  } satisfies CSSProperties,
  addLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  addLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  addRequiredDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#36bffa",
    flexShrink: 0,
  } satisfies CSSProperties,
  addActionRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    width: "100%",
  } satisfies CSSProperties,
  bpdList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,
  assetAccordion: {
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  } satisfies CSSProperties,
  assetHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 8,
    cursor: "pointer",
  } satisfies CSSProperties,
  assetIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 5,
    backgroundColor: "#7a5af8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } satisfies CSSProperties,
  assetInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  } satisfies CSSProperties,
  assetLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
  } satisfies CSSProperties,
  assetVersion: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: "18px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } satisfies CSSProperties,
  assetName: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#3f3f46",
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  } satisfies CSSProperties,
  assetUrlRow: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  } satisfies CSSProperties,
  assetUrl: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#0ba5ec",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: 1,
    minWidth: 0,
    textDecoration: "none",
  } satisfies CSSProperties,
  assetMain: {
    borderTop: "1px solid #e4e4e7",
    display: "flex",
    padding: 16,
    gap: 0,
  } satisfies CSSProperties,
  assetHistoryCol: {
    display: "flex",
    flexDirection: "column",
    width: 142,
    flexShrink: 0,
  } satisfies CSSProperties,
  assetBpdInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    minWidth: 0,
  } satisfies CSSProperties,
  versionBadge: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 12,
    padding: "3px 10px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  bpdVerRow: {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
  } satisfies CSSProperties,
  bpdVerContent: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingBottom: 16,
  } satisfies CSSProperties,
  bpdVersionText: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: "18px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  bpdVerUser: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  bpdVerDate: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  bpdViewerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  } satisfies CSSProperties,
  bpdToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } satisfies CSSProperties,
  bpdToolbarLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  bpdToolBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 30,
    border: "1px solid #71717a",
    borderRadius: 4,
    background: "#ffffff",
    cursor: "pointer",
    padding: 3,
  } satisfies CSSProperties,
  bpdViewerArea: {
    width: "100%",
    minHeight: 300,
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    backgroundColor: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } satisfies CSSProperties,
  bpdPlaceholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    minHeight: 300,
  } satisfies CSSProperties,
  bpdSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: "#e4e4e7",
  } satisfies CSSProperties,
  bpdSpecSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  } satisfies CSSProperties,
  bpdSpecHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  bpdSpecLabelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  bpdSpecText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    margin: 0,
  } satisfies CSSProperties,
  bpdSpecActions: {
    display: "flex",
    alignItems: "center",
    gap: 0,
  } satisfies CSSProperties,
  bpdEditBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    padding: 3,
    border: "1px solid #7a5af8",
    borderRadius: 4,
    background: "#ffffff",
    cursor: "pointer",
  } satisfies CSSProperties,
  bpdEditBtnText: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#7a5af8",
  } satisfies CSSProperties,
};
