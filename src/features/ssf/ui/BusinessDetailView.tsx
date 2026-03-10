import { useState, useEffect, type CSSProperties, type ReactNode } from "react";
import { useParams } from "react-router";
import { useMdiStore } from "@/shared/model/mdi.store";
import { usePageHeader } from "@/shared/hooks/usePageHeader";
import {
  BUSINESS_MOCK_DATA,
  COMPONENT_MOCK_DATA,
  DOMAIN_MOCK_DATA,
} from "@/features/ssf/model/mock-data";
import { BpmnViewer } from "@/shared/ui/service/BpmnViewer";
import { ToastEditor } from "@/shared/ui/service/ToastEditor";
import { RadioGroup } from "@/shared/ui/global/RadioGroup";
import { Button } from "@/shared/ui/global/Button";
import { BusinessEditPopup } from "@/features/ssf/ui/BusinessEditPopup";
import { FONT } from "@/shared/ui/styles";

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M6.75 4.5L11.25 9L6.75 13.5"
        stroke="#71717a"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <path
        d="M10 4C6.13 4 3 7.13 3 11C3 14.87 6.13 18 10 18C13.87 18 17 14.87 17 11"
        stroke="#71717a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 7V11L13 13"
        stroke="#71717a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NoDataIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="22" r="10" stroke="#d4d4d8" strokeWidth="1.5" />
      <path
        d="M20 36C20 32.6863 22.6863 30 26 30C29.3137 30 32 32.6863 32 36"
        stroke="#d4d4d8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="18"
        x2="38"
        y2="14"
        stroke="#d4d4d8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AccordionToggle({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d={open ? "M16 14L12 10L8 14" : "M8 10L12 14L16 10"}
        stroke="#71717a"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface LabelValueProps {
  label: string;
  value: ReactNode;
  fullWidth?: boolean;
}

function LabelValue({ label, value, fullWidth }: LabelValueProps) {
  return (
    <div style={{ ...s.fieldCol, ...(fullWidth ? { width: "100%" } : {}) }}>
      <span style={s.fieldLabel}>{label}</span>
      <span style={s.fieldValue}>{value}</span>
    </div>
  );
}

interface ListItemRowProps {
  badge: string;
  badgeColor: string;
  badgeBg?: string;
  text: string;
}

function ListItemRow({ badge, badgeColor, badgeBg, text }: ListItemRowProps) {
  return (
    <div style={s.listItem}>
      <div style={s.listItemLeft}>
        <span
          style={{
            ...s.listBadge,
            color: badgeColor,
            borderColor: badgeColor,
            backgroundColor: badgeBg || "transparent",
          }}
        >
          {badge}
        </span>
        <span style={s.listText}>{text}</span>
      </div>
      <button type="button" style={s.listArrowBtn}>
        <ChevronIcon />
      </button>
    </div>
  );
}

function SectionHeader({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div style={s.sectionHeader}>
      <span style={s.sectionTitle}>{title}</span>
      {right && <div style={s.sectionRight}>{right}</div>}
    </div>
  );
}

function NoDataArea() {
  return (
    <div style={s.noData}>
      <NoDataIcon />
      <span style={s.noDataText}>등록된 정보가 없습니다.</span>
    </div>
  );
}

function MiniPagination({
  current,
  total,
  perPage,
}: {
  current: number;
  total: number;
  perPage: number;
}) {
  return (
    <div style={s.miniPagination}>
      <span style={s.paginationLabel}>Items per page:</span>
      <select style={s.paginationSelect} defaultValue={perPage}>
        <option>{perPage}</option>
      </select>
      <span style={s.paginationLabel}>
        {(current - 1) * perPage + 1}-{Math.min(current * perPage, total)} of{" "}
        {total}
      </span>
      <span style={s.paginationNav}>
        {"< "}
        {current}
        {" >"}
      </span>
    </div>
  );
}

interface LevelBadgeProps {
  level: string;
  code: string;
  color: string;
  name: string;
  active?: boolean;
  onClick?: () => void;
}

function LevelBadge({ level, code, color, name, active, onClick }: LevelBadgeProps) {
  return (
    <div
      style={{
        ...s.lvCard,
        ...(active ? { border: `1px solid #7a5af8` } : {}),
        ...(!active ? { opacity: 0.5 } : {}),
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div style={s.lvBadgeWrap}>
        <div style={{ ...s.lvBadgeBase, borderColor: color }}>
          <span style={{ ...s.lvDot, backgroundColor: color }}>
            <span style={s.lvDotText}>{level}</span>
          </span>
          <span style={{ ...s.lvBadgeText, color }}>{code}</span>
        </div>
      </div>
      <div style={s.lvNameRow}>
        <span style={s.lvName}>{name}</span>
        <button type="button" style={s.lvToggleBtn}>
          <AccordionToggle open={active || false} />
        </button>
      </div>
    </div>
  );
}

interface HistoryItemProps {
  type: string;
  typeColor: string;
  typeBg: string;
  typeBorderColor: string;
  user: string;
  date: string;
  isFirst?: boolean;
  isLast?: boolean;
  active?: boolean;
}

function HistoryItem({
  type,
  typeColor,
  typeBg,
  typeBorderColor,
  user,
  date,
  isFirst,
  isLast,
  active,
}: HistoryItemProps) {
  return (
    <div style={s.historyItem}>
      <div style={s.historyMark}>
        {!isFirst && <div style={s.historyLineTop} />}
        <div
          style={{
            ...s.historyDot,
            backgroundColor: active ? "#7a5af8" : "#d4d4d8",
          }}
        />
        {!isLast && <div style={s.historyLineBottom} />}
      </div>
      <div style={s.historyContent}>
        <span
          style={{
            ...s.historyBadge,
            color: typeColor,
            backgroundColor: typeBg,
            borderColor: typeBorderColor,
          }}
        >
          {type}
        </span>
        <span style={s.historyUser}>{user}</span>
        <span style={s.historyDate}>{date}</span>
      </div>
    </div>
  );
}

const HISTORY_DATA = [
  {
    type: "수정",
    typeColor: "#f79009",
    typeBg: "#fffaeb",
    typeBorderColor: "#f79009",
    user: "전우치",
    date: "2025-11-28 15:24",
    active: true,
  },
  {
    type: "수정",
    typeColor: "#f79009",
    typeBg: "#fffaeb",
    typeBorderColor: "#f79009",
    user: "홍길동",
    date: "2025-11-20 09:15",
    active: false,
  },
  {
    type: "저장",
    typeColor: "#1ac057",
    typeBg: "#f2fdf5",
    typeBorderColor: "#1ac057",
    user: "이순신",
    date: "2025-11-15 14:30",
    active: false,
  },
];

const FLOW_ITEMS = [
  { id: "B0001", text: "고객인증" },
  { id: "B0002", text: "본인인증" },
  { id: "B0003", text: "업무승인 요청 및 처리" },
];

const REQ_ITEMS = [
  { id: "RQ-LA-0013", text: "인터페이스 구조개선" },
  { id: "RQ-LA-0014", text: "고객정보 연동 시스템 구축" },
  { id: "RQ-LA-0015", text: "결제 모듈 통합 관리" },
  { id: "RQ-LA-0016", text: "알림 서비스 고도화" },
];

const PROJECT_ITEMS = [
  { id: "PJ-0001", text: "차세대 시스템 고도화" },
  { id: "PJ-0002", text: "운영 안정화 프로젝트" },
  { id: "PJ-0003", text: "데이터 마이그레이션" },
  { id: "PJ-0004", text: "보안 체계 강화" },
];

const EPC_L3_ITEMS = [
  { id: "BZ-EPC001-001", text: "상품 카탈로그 조회" },
  { id: "BZ-EPC001-002", text: "상품 사양 관리" },
  { id: "BZ-EPC001-003", text: "상품 카테고리 관리" },
];

const L3_ITEMS = [
  { id: "BZ-SKNC001-001", text: "서비스 카탈로그 조회" },
  { id: "BZ-SKNC001-002", text: "서비스 사양 관리" },
  { id: "BZ-SKNC001-003", text: "고객 중심 서비스 뷰" },
];

const BPD_ITEMS = [
  {
    id: "bpd-1",
    name: "Biz Process Diagram 01",
    version: "v 2.11.029",
    status: "Deployed" as const,
    url: "https://aidevops.nova.com/bizasset/asset/bpd/XSyRe1g6UOdG9FChcYmacQ",
  },
  {
    id: "bpd-2",
    name: "Biz Process Diagram 02",
    version: "v 1.02.000.01",
    status: "Deployed" as const,
    url: "https://aidevops.nova.com/bizasset/asset/bpd/XSyRe1g6UOdG9FChcYmacQ",
    history: [
      {
        version: "v 1.02.000.01",
        status: "Deployed" as const,
        user: "전우치",
        date: "2025-11-28 15:24",
        active: true,
      },
      {
        version: "v 1.02.000",
        status: "Retired" as const,
        user: "전우치",
        date: "2025-11-28 15:24",
        active: false,
      },
      {
        version: "v 1.01.000",
        status: "Retired" as const,
        user: "전우치",
        date: "2025-11-28 15:24",
        active: false,
      },
      {
        version: "v 1.00.000",
        status: "Retired" as const,
        user: "전우치",
        date: "2025-11-28 15:24",
        active: false,
      },
    ],
    spec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

function BpdIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 5C4 4.44772 4.44772 4 5 4H9L11 6H19C19.5523 6 20 6.44772 20 7V10H4V5Z"
        fill="white"
        fillOpacity="0.9"
      />
      <path
        d="M4 10H20V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V10Z"
        fill="white"
        fillOpacity="0.7"
      />
      <path
        d="M9 14H15"
        stroke="white"
        strokeOpacity="0.9"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 4V16M4 10H16"
        stroke="#7a5af8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExpandIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d={expanded ? "M14 12L10 8L6 12" : "M6 8L10 12L14 8"}
        stroke="#3f3f46"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZoomInIcon() {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
      <circle cx="8" cy="12" r="5" stroke="#71717a" strokeWidth="1.2" />
      <path
        d="M12 16L15 19"
        stroke="#71717a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M8 10V14M6 12H10"
        stroke="#71717a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
      <circle cx="8" cy="12" r="5" stroke="#71717a" strokeWidth="1.2" />
      <path
        d="M12 16L15 19"
        stroke="#71717a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M6 12H10"
        stroke="#71717a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FitIcon() {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
      <rect
        x="3"
        y="8"
        width="12"
        height="8"
        rx="1"
        stroke="#71717a"
        strokeWidth="1.2"
      />
      <path
        d="M6 8V7M12 8V7M6 16V17M12 16V17"
        stroke="#71717a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M12.5 3.5L14.5 5.5L5.5 14.5H3.5V12.5L12.5 3.5Z"
        stroke="#7a5af8"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

interface BpdVersionItemProps {
  version: string;
  status: "Deployed" | "Retired";
  user: string;
  date: string;
  isFirst: boolean;
  isLast: boolean;
  active: boolean;
}

function BpdVersionItem({
  version,
  status,
  user,
  date,
  isFirst,
  isLast,
  active,
}: BpdVersionItemProps) {
  return (
    <div style={s.bpdVerRow}>
      <div style={s.historyMark}>
        {!isFirst && <div style={s.historyLineTop} />}
        <div
          style={{
            ...s.historyDot,
            backgroundColor: active ? "#7a5af8" : "#d4d4d8",
          }}
        />
        {!isLast && <div style={s.historyLineBottom} />}
      </div>
      <div style={s.bpdVerContent}>
        <span style={s.bpdVersionText}>{version}</span>
        <VersionBadge status={status} />
        <span style={s.bpdVerUser}>{user}</span>
        <span style={s.bpdVerDate}>{date}</span>
      </div>
    </div>
  );
}

interface AssetAccordionProps {
  name: string;
  version: string;
  status: "Deployed" | "Retired";
  url: string;
  history?: BpdVersionItemProps[] | (typeof BPD_ITEMS)[1]["history"];
  spec?: string;
  expanded: boolean;
  onToggle: () => void;
}

function AssetAccordion({
  name,
  version,
  status,
  url,
  history,
  spec,
  expanded,
  onToggle,
}: AssetAccordionProps) {
  return (
    <div style={s.assetAccordion}>
      <div style={s.assetHeader}>
        <div style={s.assetIconWrap}>
          <BpdIcon />
        </div>
        <div style={s.assetInfo}>
          <div style={s.assetLabelRow}>
            <VersionBadge status={status} />
            <span style={s.assetVersion}>{version}</span>
            <span style={s.assetName}>{name}</span>
          </div>
          <div style={s.assetUrlRow}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={s.assetUrl}
            >
              {url}
            </a>
          </div>
        </div>
        <button type="button" style={s.lvToggleBtn} onClick={onToggle}>
          <ExpandIcon expanded={expanded} />
        </button>
      </div>

      {expanded && (
        <div style={s.assetMain}>
          {history && history.length > 0 && (
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
                  active={h.active}
                />
              ))}
            </div>
          )}
          <div style={s.assetBpdInfo}>
            <div style={s.bpdViewerContainer}>
              <div style={s.bpdToolbar}>
                <div style={s.bpdToolbarLeft}>
                  <button type="button" style={s.bpdToolBtn}>
                    <ZoomInIcon />
                  </button>
                  <button type="button" style={s.bpdToolBtn}>
                    <ZoomOutIcon />
                  </button>
                  <button type="button" style={s.bpdToolBtn}>
                    <FitIcon />
                  </button>
                </div>
              </div>
              <div style={s.bpdViewerArea}>
                <div style={s.bpdPlaceholder}>
                  {/* <span style={s.bpdPlaceholderText}>BPD Viewer</span> */}
                  <BpmnViewer
                    xml={`<?xml version="1.0" encoding="UTF-8"?>
                  <bpmn:definitions
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                    xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                    xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                    xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                    id="Definitions_1"
                    targetNamespace="http://bpmn.io/schema/bpmn">

                    <bpmn:process id="Process_ApprovalFlow" name="Approval Process" isExecutable="false">

                      <bpmn:startEvent id="StartEvent_1" name="Start">
                        <bpmn:outgoing>Flow_1</bpmn:outgoing>
                      </bpmn:startEvent>

                      <bpmn:userTask id="Task_Request" name="Submit Request">
                        <bpmn:incoming>Flow_1</bpmn:incoming>
                        <bpmn:outgoing>Flow_2</bpmn:outgoing>
                      </bpmn:userTask>

                      <bpmn:userTask id="Task_Review" name="Manager Review">
                        <bpmn:incoming>Flow_2</bpmn:incoming>
                        <bpmn:outgoing>Flow_3</bpmn:outgoing>
                      </bpmn:userTask>

                      <bpmn:exclusiveGateway id="Gateway_Approval" name="Approved?">
                        <bpmn:incoming>Flow_3</bpmn:incoming>
                        <bpmn:outgoing>Flow_4</bpmn:outgoing>
                        <bpmn:outgoing>Flow_5</bpmn:outgoing>
                      </bpmn:exclusiveGateway>

                      <bpmn:serviceTask id="Task_Process" name="Process Request">
                        <bpmn:incoming>Flow_4</bpmn:incoming>
                        <bpmn:outgoing>Flow_6</bpmn:outgoing>
                      </bpmn:serviceTask>

                      <bpmn:endEvent id="EndEvent_Success" name="Completed">
                        <bpmn:incoming>Flow_6</bpmn:incoming>
                      </bpmn:endEvent>

                      <bpmn:endEvent id="EndEvent_Rejected" name="Rejected">
                        <bpmn:incoming>Flow_5</bpmn:incoming>
                      </bpmn:endEvent>

                      <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_Request"/>
                      <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_Request" targetRef="Task_Review"/>
                      <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_Review" targetRef="Gateway_Approval"/>

                      <bpmn:sequenceFlow id="Flow_4" name="Yes" sourceRef="Gateway_Approval" targetRef="Task_Process"/>
                      <bpmn:sequenceFlow id="Flow_5" name="No" sourceRef="Gateway_Approval" targetRef="EndEvent_Rejected"/>

                      <bpmn:sequenceFlow id="Flow_6" sourceRef="Task_Process" targetRef="EndEvent_Success"/>

                    </bpmn:process>

                    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
                      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_ApprovalFlow">

                        <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
                          <dc:Bounds x="150" y="120" width="36" height="36"/>
                        </bpmndi:BPMNShape>

                        <bpmndi:BPMNShape id="Task_Request_di" bpmnElement="Task_Request">
                          <dc:Bounds x="250" y="100" width="120" height="80"/>
                        </bpmndi:BPMNShape>

                        <bpmndi:BPMNShape id="Task_Review_di" bpmnElement="Task_Review">
                          <dc:Bounds x="420" y="100" width="120" height="80"/>
                        </bpmndi:BPMNShape>

                        <bpmndi:BPMNShape id="Gateway_Approval_di" bpmnElement="Gateway_Approval" isMarkerVisible="true">
                          <dc:Bounds x="610" y="110" width="50" height="50"/>
                        </bpmndi:BPMNShape>

                        <bpmndi:BPMNShape id="Task_Process_di" bpmnElement="Task_Process">
                          <dc:Bounds x="760" y="100" width="120" height="80"/>
                        </bpmndi:BPMNShape>

                        <bpmndi:BPMNShape id="EndEvent_Success_di" bpmnElement="EndEvent_Success">
                          <dc:Bounds x="930" y="120" width="36" height="36"/>
                        </bpmndi:BPMNShape>

                        <bpmndi:BPMNShape id="EndEvent_Rejected_di" bpmnElement="EndEvent_Rejected">
                          <dc:Bounds x="760" y="250" width="36" height="36"/>
                        </bpmndi:BPMNShape>

                        <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
                          <di:waypoint x="186" y="138"/>
                          <di:waypoint x="250" y="138"/>
                        </bpmndi:BPMNEdge>

                        <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
                          <di:waypoint x="370" y="138"/>
                          <di:waypoint x="420" y="138"/>
                        </bpmndi:BPMNEdge>

                        <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
                          <di:waypoint x="540" y="138"/>
                          <di:waypoint x="610" y="135"/>
                        </bpmndi:BPMNEdge>

                        <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
                          <di:waypoint x="660" y="135"/>
                          <di:waypoint x="760" y="138"/>
                        </bpmndi:BPMNEdge>

                        <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5">
                          <di:waypoint x="635" y="160"/>
                          <di:waypoint x="635" y="268"/>
                          <di:waypoint x="760" y="268"/>
                        </bpmndi:BPMNEdge>

                        <bpmndi:BPMNEdge id="Flow_6_di" bpmnElement="Flow_6">
                          <di:waypoint x="880" y="138"/>
                          <di:waypoint x="930" y="138"/>
                        </bpmndi:BPMNEdge>

                      </bpmndi:BPMNPlane>
                    </bpmndi:BPMNDiagram>

                  </bpmn:definitions>`}
                  />
                </div>
              </div>
            </div>
            <div style={s.bpdSeparator} />
            {spec && (
              <div style={s.bpdSpecSection}>
                <div style={s.bpdSpecHeader}>
                  <div style={s.bpdSpecLabelRow}>
                    <span style={s.fieldLabel}>BPD 명세</span>
                    <button style={s.historyBtn} type="button">
                      <HistoryIcon />
                      <span style={s.historyBtnText}>3 History</span>
                    </button>
                  </div>
                </div>
                <p style={s.bpdSpecText}>{spec}</p>
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

export function BusinessDetailView() {
  const { id } = useParams<{ id: string }>();
  const addTab = useMdiStore((st) => st.addTab);
  const [historyOpen, setHistoryOpen] = useState(true);
  const [expandedBpd, setExpandedBpd] = useState<string | null>("bpd-2");
  const [bpdAddOpen, setBpdAddOpen] = useState(false);
  const [bpdSpec, setBpdSpec] = useState("");
  const [bpdVersionType, setBpdVersionType] = useState("Major");
  const [bpdVersionDesc, setBpdVersionDesc] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [activeSsfTab, setActiveSsfTab] = useState<"EPC" | "TMFC" | null>("TMFC");

  const item = BUSINESS_MOCK_DATA.find((b) => b.businessId === id);

  useEffect(() => {
    addTab({
      id: `/ssf/business/${id}`,
      label: "업무(L3)정보 상세",
      path: `/ssf/business/${id}`,
    });
  }, [id, addTab]);

  usePageHeader({
    breadcrumbItems: [
      { label: "SSF관리" },
      { label: "업무(L3)정보 관리" },
      { label: "업무(L3)정보 상세" },
    ],
    title: "업무(L3)정보 상세",
    actions: (
      <div style={{ display: "flex", gap: 8 }}>
        <Button size="m" variant="outlined" color="negative" onClick={() => {}}>
          삭제
        </Button>
        <Button size="m" variant="filled" color="positive" onClick={() => setEditOpen(true)}>
          수정
        </Button>
      </div>
    ),
  });

  if (!item) {
    return (
      <div style={s.outer}>
        <NoDataArea />
      </div>
    );
  }

  const comp = COMPONENT_MOCK_DATA.find(
    (c) =>
      c.nameKo === item.componentNameKo && c.domainNameKo === item.domainNameKo,
  );

  const domain = DOMAIN_MOCK_DATA.find((d) => d.nameKo === item.domainNameKo);

  return (
    <div style={s.outer}>
      <div style={s.row}>
        {/* Left Column */}
        <div style={s.leftCol}>
          {/* historyWrap: container + history panel */}
          <div style={s.historyWrap}>
            <div style={{ ...s.container, flex: 1 }}>
              <SectionHeader
                title="업무(L3) 기준 정보"
                right={
                  <button
                    style={s.historyBtn}
                    type="button"
                    onClick={() => setHistoryOpen(!historyOpen)}
                  >
                    <HistoryIcon />
                    <span style={s.historyBtnText}>3 History</span>
                  </button>
                }
              />
              <div style={s.mainFields}>
                <LabelValue label="업무(L3) ID" value={item.businessId} />
                <LabelValue label="업무(L3) 명" value={item.nameKo} />
                <div style={s.fieldRow}>
                  <LabelValue label="L2기획리더" value={item.planLeader} />
                  <LabelValue label="L3설계리더" value={item.designLeader} />
                </div>
                <div style={s.fieldRow}>
                  <LabelValue label="저장일시" value="2025-11-28 15:24" />
                  <LabelValue
                    label="마지막 수정일시"
                    value="2025-11-28 15:24"
                  />
                </div>
                <LabelValue
                  label="업무(L3) 설명"
                  value={item.description}
                  fullWidth
                />

                {/* SSF 정보 */}
                <div style={s.ssfSection}>
                  <span style={s.ssfLabel}>SSF 정보</span>
                  <div style={s.lvAccordion}>
                    <div style={s.lvHierarchy}>
                      <LevelBadge
                        level="L1"
                        code="EPC"
                        color="#3e1c96"
                        name={domain?.nameKo || "엔터프라이즈 상품 카탈로그"}
                        active={activeSsfTab === "EPC"}
                        onClick={() => setActiveSsfTab(activeSsfTab === "EPC" ? null : "EPC")}
                      />
                      <LevelBadge
                        level="L2"
                        code={comp?.componentId || "TMFC006"}
                        color="#5925dc"
                        name={item.componentNameKo}
                        active={activeSsfTab === "TMFC"}
                        onClick={() => setActiveSsfTab(activeSsfTab === "TMFC" ? null : "TMFC")}
                      />
                    </div>

                    {activeSsfTab === "EPC" && (
                      <div style={s.lvContent}>
                        <div style={s.lvFieldRow}>
                          <LabelValue
                            label="Domain ID"
                            value={domain?.abbr || "EPC"}
                          />
                          <LabelValue
                            label="Domain(한글)"
                            value={domain?.nameKo || item.domainNameKo}
                          />
                          <LabelValue
                            label="Domain명"
                            value={domain?.nameEn || "Enterprise Product Catalog"}
                          />
                        </div>
                        <LabelValue
                          label="Domain 설명"
                          value={
                            domain?.description ||
                            "엔터프라이즈 상품 카탈로그는 상품의 전체 라이프사이클을 관리하고, 상품 사양 및 카테고리를 체계적으로 구성하는 역할을 합니다."
                          }
                          fullWidth
                        />

                        <div style={s.relSection}>
                          <div style={s.relHeaderRow}>
                            <span style={{ ...s.fieldLabel, fontSize: 14 }}>
                              연관 업무(L3)
                            </span>
                            <MiniPagination
                              current={1}
                              total={EPC_L3_ITEMS.length}
                              perPage={5}
                            />
                          </div>
                          <div style={s.relList}>
                            {EPC_L3_ITEMS.map((l3) => (
                              <ListItemRow
                                key={l3.id}
                                badge={l3.id}
                                badgeColor="#3e1c96"
                                badgeBg="rgba(62,28,150,0.05)"
                                text={l3.text}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSsfTab === "TMFC" && (
                      <div style={s.lvContent}>
                        <div style={s.lvFieldRow}>
                          <LabelValue
                            label="Component ID"
                            value={comp?.componentId || "TMFC006"}
                          />
                          <LabelValue
                            label="Component(한글)"
                            value={item.componentNameKo}
                          />
                          <LabelValue
                            label="Component명"
                            value={comp?.nameEn || "Service Catalog Management"}
                          />
                        </div>
                        <div style={s.lvFieldRow}>
                          <LabelValue
                            label="L2기획리더"
                            value={comp?.planLeader || item.planLeader}
                          />
                          <LabelValue
                            label="L2설계리더"
                            value={comp?.designLeader || item.designLeader}
                          />
                        </div>
                        <LabelValue
                          label="Component 설명"
                          value={
                            comp?.description ||
                            "서비스 카탈로그 관리 구성 요소는 수행 가능한 모든 서비스 요구 사항을 식별하고 정의하는 서비스 사양 모음을 구성하는 역할을 합니다."
                          }
                          fullWidth
                        />

                        <div style={s.relSection}>
                          <div style={s.relHeaderRow}>
                            <span style={{ ...s.fieldLabel, fontSize: 14 }}>
                              연관 업무(L3)
                            </span>
                            <MiniPagination
                              current={1}
                              total={L3_ITEMS.length}
                              perPage={5}
                            />
                          </div>
                          <div style={s.relList}>
                            {L3_ITEMS.map((l3) => (
                              <ListItemRow
                                key={l3.id}
                                badge={l3.id}
                                badgeColor="#7a5af8"
                                badgeBg="rgba(122,90,248,0.05)"
                                text={l3.text}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* History Panel */}
            {historyOpen && (
              <div style={s.historyPanel}>
                <div style={s.historyList}>
                  {HISTORY_DATA.map((h, i) => (
                    <HistoryItem
                      key={i}
                      type={h.type}
                      typeColor={h.typeColor}
                      typeBg={h.typeBg}
                      typeBorderColor={h.typeBorderColor}
                      user={h.user}
                      date={h.date}
                      isFirst={i === 0}
                      isLast={i === HISTORY_DATA.length - 1}
                      active={h.active}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BPD 관리 */}
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
                    <ToastEditor
                      value={bpdSpec}
                      onChange={setBpdSpec}
                      placeholder="업무(L3) BPD 명세를 입력하세요."
                      minHeight={300}
                    />
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
                    <ToastEditor
                      value={bpdVersionDesc}
                      onChange={setBpdVersionDesc}
                      placeholder="설명을 입력할 수 있습니다."
                      minHeight={300}
                    />
                  </div>

                  <div style={s.addActionRow}>
                    <Button
                      size="l"
                      variant="outlined"
                      color="info"
                      onClick={() => setBpdAddOpen(false)}
                    >
                      닫기
                    </Button>
                    <Button
                      size="l"
                      variant="filled"
                      color="positive"
                      style={{ flex: 1 }}
                      onClick={() => setBpdAddOpen(false)}
                    >
                      추가
                    </Button>
                  </div>
                </div>
              )}

              <div style={s.bpdList}>
                {BPD_ITEMS.map((bpd) => (
                  <AssetAccordion
                    key={bpd.id}
                    name={bpd.name}
                    version={bpd.version}
                    status={bpd.status}
                    url={bpd.url}
                    history={"history" in bpd ? bpd.history : undefined}
                    spec={"spec" in bpd ? bpd.spec : undefined}
                    expanded={expandedBpd === bpd.id}
                    onToggle={() =>
                      setExpandedBpd(expandedBpd === bpd.id ? null : bpd.id)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={s.rightCol}>
          <SectionHeader title="연관 정보" />
          <div style={s.rightMain}>
            {/* 기능(L4) - empty state */}
            <div style={s.relSection}>
              <div style={s.relHeaderRow}>
                <span style={s.relLabel}>기능(L4)</span>
                <MiniPagination current={1} total={0} perPage={5} />
              </div>
              <NoDataArea />
            </div>

            {/* 업무Flow */}
            <div style={s.relSection}>
              <span style={s.relLabel}>업무Flow</span>
              <div style={s.relList}>
                {FLOW_ITEMS.map((f) => (
                  <ListItemRow
                    key={f.id}
                    badge={f.id}
                    badgeColor="#12b76a"
                    badgeBg="rgba(18,183,106,0.05)"
                    text={f.text}
                  />
                ))}
              </div>
            </div>

            {/* 요구사항 */}
            <div style={s.relSection}>
              <div style={s.relHeaderRow}>
                <span style={s.relLabel}>요구사항</span>
                <MiniPagination
                  current={1}
                  total={REQ_ITEMS.length}
                  perPage={5}
                />
              </div>
              <div style={s.relList}>
                {REQ_ITEMS.map((r) => (
                  <ListItemRow
                    key={r.id}
                    badge={r.id}
                    badgeColor="#36bffa"
                    text={r.text}
                  />
                ))}
              </div>
            </div>

            {/* 연관 과제 */}
            <div style={s.relSection}>
              <div style={s.relHeaderRow}>
                <span style={s.relLabel}>연관 과제</span>
                <MiniPagination
                  current={1}
                  total={PROJECT_ITEMS.length}
                  perPage={5}
                />
              </div>
              <div style={s.relList}>
                {PROJECT_ITEMS.map((p) => (
                  <ListItemRow
                    key={p.id}
                    badge={p.id}
                    badgeColor="#a1a1aa"
                    text={p.text}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BusinessEditPopup
        open={editOpen}
        onClose={() => setEditOpen(false)}
        item={item}
      />
    </div>
  );
}

const s = {
  outer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflow: "auto",
  } satisfies CSSProperties,
  row: {
    display: "flex",
    width: "100%",
    minHeight: "100%",
  } satisfies CSSProperties,

  leftCol: {
    width: "62%",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  historyWrap: {
    display: "flex",
    flexDirection: "row",
  } satisfies CSSProperties,
  container: {
    padding: "24px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,

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

  mainFields: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    width: "100%",
  } satisfies CSSProperties,
  fieldCol: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies CSSProperties,
  fieldLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  fieldValue: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  fieldRow: {
    display: "flex",
    gap: 32,
    width: "100%",
  } satisfies CSSProperties,

  ssfSection: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "100%",
  } satisfies CSSProperties,
  ssfLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    marginBottom: 4,
  } satisfies CSSProperties,

  lvAccordion: {
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
  } satisfies CSSProperties,
  lvHierarchy: {
    display: "flex",
    alignItems: "center",
    padding: 8,
    gap: 0,
  } satisfies CSSProperties,
  lvCard: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    flexShrink: 0,
  } satisfies CSSProperties,
  lvBadgeWrap: {
    display: "flex",
    alignItems: "flex-start",
  } satisfies CSSProperties,
  lvBadgeBase: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingLeft: 3,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#ffffff",
  } satisfies CSSProperties,
  lvDot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 12,
    height: 12,
    borderRadius: 8,
  } satisfies CSSProperties,
  lvDotText: {
    fontFamily: FONT,
    fontSize: 8,
    fontWeight: 700,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: "8px",
  } satisfies CSSProperties,
  lvBadgeText: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  lvNameRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  lvName: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#3f3f46",
    maxWidth: 140,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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

  lvContent: {
    borderTop: "1px solid #e4e4e7",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "16px 16px 24px",
  } satisfies CSSProperties,
  lvFieldRow: {
    display: "flex",
    gap: 32,
    width: "100%",
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

  historyPanel: {
    width: 190,
    flexShrink: 0,
    backgroundColor: "#fafafa",
    borderLeft: "1px solid #e4e4e7",
    padding: 24,
  } satisfies CSSProperties,
  historyList: {
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  historyItem: {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
    minWidth: 142,
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
  historyContent: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingBottom: 16,
    minWidth: 100,
  } satisfies CSSProperties,
  historyBadge: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 12,
    padding: "3px 10px",
    alignSelf: "flex-start",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  historyUser: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  historyDate: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#3f3f46",
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
  bpdPlaceholderText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    color: "#a1a1aa",
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

  rightCol: {
    flex: 1,
    borderLeft: "1px solid #e4e4e7",
    display: "flex",
    flexDirection: "column",
    padding: "24px 32px",
    gap: 16,
  } satisfies CSSProperties,
  rightMain: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  } satisfies CSSProperties,
  relSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  } satisfies CSSProperties,
  relHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48,
  } satisfies CSSProperties,
  relLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  relList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  } satisfies CSSProperties,

  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: "8px 12px 8px 8px",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    minHeight: 40,
  } satisfies CSSProperties,
  listItemLeft: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    flex: 1,
    minWidth: 0,
  } satisfies CSSProperties,
  listBadge: {
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
  listText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: 1,
    minWidth: 0,
  } satisfies CSSProperties,
  listArrowBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    border: "1px solid #71717a",
    borderRadius: 4,
    background: "#ffffff",
    cursor: "pointer",
    padding: 3,
    flexShrink: 0,
  } satisfies CSSProperties,

  noData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 24,
    backgroundColor: "#fafafa",
    borderRadius: 4,
    minHeight: 160,
  } satisfies CSSProperties,
  noDataText: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#71717a",
    textAlign: "center",
  } satisfies CSSProperties,

  miniPagination: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  paginationLabel: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  paginationSelect: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    color: "#3f3f46",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    padding: "2px 4px",
    height: 20,
    outline: "none",
  } satisfies CSSProperties,
  paginationNav: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
};
