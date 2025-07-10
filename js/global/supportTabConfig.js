/**
 * Support 페이지 탭 설정
 */
function createSupportTabConfig() {
  const currentPath = window.location.pathname;

  // 현재 페이지에 따른 활성 탭 결정
  let activeMainTab = "inquiry"; // 기본값
  if (currentPath.includes("support-02-news")) {
    activeMainTab = "news";
  }

  const config = {
    mainTabs: [
      {
        id: "inquiry",
        text: "문의하기",
        isActive: activeMainTab === "inquiry",
      },
      { id: "news", text: "유락소식", isActive: activeMainTab === "news" },
    ],
    subTabs: {
      // support 페이지는 서브탭이 없음
    },
  };

  return config;
}

// 동적으로 설정 생성 및 전역 노출

window.supportTabConfig = createSupportTabConfig();

// 설정이 제대로 등록되었는지 확인
setTimeout(() => {}, 1000);

// 디버깅을 위한 테스트 함수만 유지
window.testSupportTab = function () {
  const container = document.getElementById("tab-container");
  if (container) {
  }

  // 강제 초기화 시도
  if (
    window.supportTabConfig &&
    typeof window.createTabComponent === "function"
  ) {
    window.createTabComponent("tab-container", window.supportTabConfig);
  }
};
