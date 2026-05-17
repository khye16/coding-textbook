# plan.md

작성일: 2026-05-18 KST  
작업: Day 2 Python 1단원 `Hello World` 콘텐츠 작성 계획  
상태: 계획만 작성. 아직 구현하지 않음.

## 1. 목표 / 비목표

### 목표

Day 2의 목표는 Python 첫 단원 `Hello World`를 학생이 바로 읽고 실행할 수 있는 형태로 만드는 것이다.

- `docs/python/01-hello-world.md` 단원 본문을 만든다.
- `exercises/python/01-hello-world/` 아래에 실습용 스타터 파일 4개를 만든다.
- `docs/.vitepress/config.ts` sidebar에 Python 1단원 링크를 추가한다.
- 단원 본문에는 Codespaces 배지, 이동 경로, 파일명, 실행 명령어, 예상 출력을 모두 명시한다.
- 단원 깊이는 "처음 읽는 학생이 20분 안에 핵심을 말로 설명할 수 있는 수준"으로 제한한다.

### 비목표

이번 단원에서는 다음을 다루지 않는다.

- `input()` 사용
- 변수 설명
- 숫자 연산 설명
- f-string
- `print()` 전체 시그니처: `sep`, `end`, `file`, `flush`
- callable 개념 또는 함수의 정식 정의
- `NameError`, `TypeError`의 깊은 설명
- 백준 1000/1001/1008 풀이
- 자동 채점, 제출 시스템, 사이트 내 실행기

## 2. 만들 파일 전체 목록 + 경로

### 새로 만들 파일

| 경로 | 목적 |
|---|---|
| `docs/python/01-hello-world.md` | Python 1단원 본문 |
| `exercises/python/01-hello-world/hello.py` | 가장 단순한 출력 과제 스타터 |
| `exercises/python/01-hello-world/greeting.py` | 한국어 출력 과제 스타터 |
| `exercises/python/01-hello-world/badge.py` | 줄바꿈/탭 응용 명찰 과제 스타터 |
| `exercises/python/01-hello-world/quotes.py` | escape 응용 따옴표 출력 과제 스타터 |

### 수정할 파일

| 경로 | 수정 내용 |
|---|---|
| `docs/.vitepress/config.ts` | sidebar에 Python 1단원 링크 추가 |

### 생성할 폴더

| 경로 | 목적 |
|---|---|
| `docs/python/` | Python 단원 Markdown 위치 |
| `exercises/python/01-hello-world/` | Python 1단원 실습 파일 위치 |

## 3. 단원 본문 깊이 결정

### 본문 핵심에 포함

- `print("문장")` 형태로 화면에 글자 출력하기
- 작은따옴표와 큰따옴표
- `print()`의 자동 줄바꿈
- 한국어 문자열 출력: Python 3와 Codespaces에서는 기본적으로 잘 작동한다고 설명
- escape 시퀀스 통합 학습
  - `\n`: 줄바꿈, 정식 설명
  - `\t`: 탭, 정식 설명
  - `\\`, `\"`, `\'`: 이런 것도 있다는 짧은 언급
  - 핵심 원칙: 특수 문자는 `\` + 글자로 표현한다.
- 따옴표 안 따옴표 처리
  - 바깥 따옴표 종류 바꾸기
  - escape 사용
- 함수 개념은 "이름 + 괄호 = 실행한다" 정도로만 언급
- 흔한 실수는 `SyntaxError` 한 계열만 깊게 다룸
  - 괄호 닫기 실수
  - 따옴표 닫기 실수

### 본문에서 제외

- `print()` 전체 시그니처
- `sep`, `end`, `file`, `flush`
- callable 개념
- 함수의 정식 정의
- `NameError`, `TypeError` 깊은 설명
- `Print`, `print(Hello)`는 자가진단에서만 짧게 다룸

## 4. 단원 본문 전체 초안

아래 초안은 그대로 `docs/python/01-hello-world.md`에 들어갈 본문이다.

````markdown
# 01 Hello World

## 이걸 왜 배우나

프로그래밍의 첫 번째 성공 경험은 내가 쓴 문장이 화면에 그대로 나오는 순간입니다.  
`print()`는 앞으로 결과를 확인하고, 실수를 찾고, 문제 풀이 답을 출력할 때 계속 쓰는 가장 기본 도구입니다.

## 핵심 개념

가장 작은 Python 프로그램부터 시작해 봅시다.

```python
print("Hello, Python!")
```

이 한 줄은 세 부분으로 나눌 수 있습니다.

| 부분 | 뜻 |
|---|---|
| `print` | 화면에 값을 보여 주는 Python의 기본 기능 |
| `(...)` | 그 기능을 실행한다는 표시 |
| `"Hello, Python!"` | 화면에 보여 줄 글자 |

첫 단원에서는 함수라는 말을 어렵게 외우지 않아도 됩니다.  
지금은 **이름 + 괄호 = 실행한다** 정도만 기억하면 됩니다.

### 문자열과 따옴표

Python에서 글자는 따옴표로 감쌉니다. 이렇게 따옴표로 감싼 글자 데이터를 문자열이라고 부릅니다.

```python
print("안녕하세요")
print('안녕하세요')
```

큰따옴표와 작은따옴표는 둘 다 문자열을 만들 수 있습니다.  
처음에는 둘 중 편한 것을 쓰면 됩니다.

한국어도 그대로 출력할 수 있습니다.

```python
print("파이썬 첫 수업입니다.")
```

우리가 쓰는 Python 3와 Codespaces 환경에서는 한국어 문자열이 기본적으로 잘 동작합니다.

### 자동 줄바꿈

`print()`는 한 번 실행될 때마다 마지막에 줄을 바꿉니다.

```python
print("첫 줄")
print("둘째 줄")
print("셋째 줄")
```

출력:

```text
첫 줄
둘째 줄
셋째 줄
```

코드는 위에서 아래로 한 줄씩 실행됩니다.  
그래서 `print()`를 세 번 쓰면 출력도 세 줄이 됩니다.

### 특수 문자는 `\` + 글자로 표현한다

문자열 안에는 그냥 보이는 글자 말고 특별한 표시도 넣을 수 있습니다.  
핵심 원칙은 간단합니다.

```text
특수 문자는 \ + 글자로 표현한다.
```

가장 먼저 알아둘 특수 문자는 `\n`입니다. `\n`은 문자열 안에서 줄을 바꿉니다.

```python
print("Python\nC")
```

출력:

```text
Python
C
```

`\t`는 탭 간격을 넣습니다.

```python
print("이름\t언어")
print("민수\tPython")
```

출력:

```text
이름    언어
민수    Python
```

터미널에서는 탭의 폭이 환경에 따라 조금 다르게 보일 수 있습니다. 중요한 것은 `\t`가 글자 사이에 넓은 간격을 만든다는 점입니다.

그 밖에도 이런 특수 표현이 있습니다.

| 표현 | 뜻 |
|---|---|
| `\\` | 백슬래시 하나 출력 |
| `\"` | 큰따옴표 출력 |
| `\'` | 작은따옴표 출력 |

처음부터 모두 외울 필요는 없습니다.  
문자열 안에서 따옴표나 백슬래시가 필요할 때 다시 보면 됩니다.

### 따옴표 안에 따옴표 넣기

문장 안에 큰따옴표를 출력하고 싶다면 바깥을 작은따옴표로 감싸면 쉽습니다.

```python
print('그가 말했다: "좋아!"')
```

출력:

```text
그가 말했다: "좋아!"
```

반대로 문장 안에 작은따옴표가 있다면 바깥을 큰따옴표로 감싸면 됩니다.

```python
print("I'm learning Python.")
```

출력:

```text
I'm learning Python.
```

같은 따옴표를 꼭 써야 한다면 `\`를 앞에 붙입니다.

```python
print("그가 말했다: \"좋아!\"")
print('I\'m learning Python.')
```

출력:

```text
그가 말했다: "좋아!"
I'm learning Python.
```

## 예시 1 / 2 / 3

### 예시 1: 첫 출력

```python
print("Hello, Python!")
```

출력:

```text
Hello, Python!
```

이 예시는 `print("문장")` 형태를 익히는 가장 작은 코드입니다.

### 예시 2: 한국어 여러 줄 출력

```python
print("안녕하세요.")
print("Python을 배우기 시작했습니다.")
print("오늘은 print()를 연습합니다.")
```

출력:

```text
안녕하세요.
Python을 배우기 시작했습니다.
오늘은 print()를 연습합니다.
```

`print()`를 여러 번 쓰면 출력도 여러 줄로 나옵니다.

### 예시 3: 줄바꿈과 탭으로 모양 만들기

```python
print("나의 첫 Python 명찰\n이름:\t홍길동\n언어:\tPython\n상태:\t연습 중")
```

출력:

```text
나의 첫 Python 명찰
이름:    홍길동
언어:    Python
상태:    연습 중
```

터미널마다 탭 간격은 조금 다를 수 있습니다. 그래도 `\t`가 항목과 값을 띄워 주는 역할을 한다는 점은 같습니다.

## 흔한 실수

이번 단원에서는 `SyntaxError` 한 가지만 깊게 봅니다.  
`SyntaxError`는 Python이 코드의 모양을 읽다가 "문법 모양이 맞지 않는다"고 알려 주는 에러입니다.

### 1. 따옴표를 닫지 않음

잘못된 코드:

```python
print("Hello, Python!)
```

자주 보이는 에러:

```text
SyntaxError: unterminated string literal (detected at line 1)
```

원인:

```text
" 로 문자열을 시작했지만 닫는 " 가 없습니다.
```

고친 코드:

```python
print("Hello, Python!")
```

### 2. 괄호를 닫지 않음

잘못된 코드:

```python
print("Hello, Python!"
```

자주 보이는 에러:

```text
SyntaxError: '(' was never closed
```

원인:

```text
print( 로 실행을 시작했지만 닫는 ) 가 없습니다.
```

고친 코드:

```python
print("Hello, Python!")
```

실수를 고칠 때는 먼저 두 가지를 확인하세요.

1. 따옴표를 열었으면 같은 종류의 따옴표로 닫았는가?
2. 괄호를 열었으면 닫는 괄호가 있는가?

## 자가진단

### 문제 1. 출력 예측

다음 코드는 무엇을 출력할까요?

```python
print("Python\nC")
print("Hello")
```

정답:

```text
Python
C
Hello
```

### 문제 2. 에러 찾기

다음 코드에서 잘못된 부분을 찾고 고쳐 보세요.

```python
Print("안녕하세요")
```

정답:

```python
print("안녕하세요")
```

Python은 대문자와 소문자를 구분합니다.  
이번 단원에서는 에러 이름을 깊게 외우기보다, `Print`를 소문자 `print`로 고치는 것만 기억하면 됩니다.

### 문제 3. 빈칸 채우기

다음 출력이 나오도록 빈칸을 채우세요.

원하는 출력:

```text
그가 말했다: "Python!"
```

코드:

```python
print(____)
```

정답 예시 1:

```python
print('그가 말했다: "Python!"')
```

정답 예시 2:

```python
print("그가 말했다: \"Python!\"")
```

## 직접 풀어보기

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/khye16/coding-textbook?quickstart=1)

Codespaces가 열리면 아래 폴더로 이동하세요:

```powershell
cd exercises/python/01-hello-world
```

### 문제 1. `hello.py`

`hello.py` 파일을 열고 `Hello, Python!`이 출력되도록 완성하세요.

실행 명령어:

```powershell
python3 hello.py
```

예상 출력:

```text
Hello, Python!
```

### 문제 2. `greeting.py`

`greeting.py` 파일을 열고 한국어 문장 3줄이 출력되도록 완성하세요.

실행 명령어:

```powershell
python3 greeting.py
```

예상 출력:

```text
안녕하세요.
저는 Python을 배우고 있습니다.
오늘은 print()를 배웠습니다.
```

### 문제 3. `badge.py`

`badge.py` 파일을 열고 `\n` 줄바꿈과 `\t` 탭을 사용해 명찰 모양을 완성하세요.

실행 명령어:

```powershell
python3 badge.py
```

예상 출력:

```text
나의 첫 Python 명찰
이름:    홍길동
언어:    Python
상태:    연습 중
```

탭 간격은 터미널 환경에 따라 조금 다르게 보일 수 있습니다.

### 문제 4. `quotes.py`

`quotes.py` 파일을 열고 따옴표가 포함된 문장이 출력되도록 완성하세요.

실행 명령어:

```powershell
python3 quotes.py
```

예상 출력:

```text
그가 말했다: "좋아!"
I'm learning Python.
백슬래시는 이렇게 씁니다: \
```

### 추가 연습: 백준 문제

문제 본문은 복사하지 않고 링크만 제공합니다. 백준 사이트에서 문제를 직접 확인하세요.

- 필수: [2557 Hello World](https://www.acmicpc.net/problem/2557)
- 필수 또는 도전: [10718 We love kriii](https://www.acmicpc.net/problem/10718)
- 도전: [10171 고양이](https://www.acmicpc.net/problem/10171)
- 도전: [10172 개](https://www.acmicpc.net/problem/10172)

`1000`, `1001`, `1008` 문제는 입력을 배운 뒤에 풀어도 늦지 않습니다.

## 참고 자료

- [Python 공식 문서: print()](https://docs.python.org/3/library/functions.html#print)
- [Python 공식 튜토리얼: 문자열 기초](https://docs.python.org/3/tutorial/introduction.html)
- [CS50 Python Lecture 0](https://cs50.harvard.edu/python/notes/0/)
- [점프 투 파이썬: 사용자 입출력](https://wikidocs.net/25)
````

## 5. exercises 폴더 각 `.py` 파일 스타터 코드

### `exercises/python/01-hello-world/hello.py`

```python
# TODO: 아래 줄을 고쳐서 Hello, Python! 이 출력되게 하세요.
print("")
```

완성 후 예상 출력:

```text
Hello, Python!
```

### `exercises/python/01-hello-world/greeting.py`

```python
# TODO: print()를 3번 사용해 아래 문장 3줄을 출력하세요.
# 안녕하세요.
# 저는 Python을 배우고 있습니다.
# 오늘은 print()를 배웠습니다.

print("")
print("")
print("")
```

완성 후 예상 출력:

```text
안녕하세요.
저는 Python을 배우고 있습니다.
오늘은 print()를 배웠습니다.
```

### `exercises/python/01-hello-world/badge.py`

```python
# TODO: \n과 \t를 사용해 명찰 모양을 완성하세요.
# 예상 출력:
# 나의 첫 Python 명찰
# 이름:    홍길동
# 언어:    Python
# 상태:    연습 중

print("나의 첫 Python 명찰\n이름:\t\n언어:\t\n상태:\t")
```

완성 후 예상 출력:

```text
나의 첫 Python 명찰
이름:    홍길동
언어:    Python
상태:    연습 중
```

### `exercises/python/01-hello-world/quotes.py`

```python
# TODO: 따옴표와 백슬래시가 출력되도록 문자열을 완성하세요.
# 힌트:
# 큰따옴표를 출력하려면 바깥을 작은따옴표로 감싸거나 \"를 사용할 수 있습니다.
# 작은따옴표를 출력하려면 바깥을 큰따옴표로 감싸거나 \'를 사용할 수 있습니다.
# 백슬래시 하나를 출력하려면 \\를 사용합니다.

print("")
print("")
print("")
```

완성 후 예상 출력:

```text
그가 말했다: "좋아!"
I'm learning Python.
백슬래시는 이렇게 씁니다: \
```

## 6. `config.ts` 사이드바 변경 부분

현재 `docs/.vitepress/config.ts`의 `themeConfig`에 Python 1단원 링크를 추가한다.

정확한 diff:

```diff
   themeConfig: {
     nav: [
-      { text: 'Home', link: '/' }
+      { text: 'Home', link: '/' },
+      { text: 'Python', link: '/python/01-hello-world' }
     ],
-    sidebar: []
+    sidebar: [
+      {
+        text: 'Python',
+        items: [
+          { text: '01. Hello World', link: '/python/01-hello-world' }
+        ]
+      }
+    ]
   }
 })
```

변경 후 목표 형태:

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ko-KR',
  title: 'Python & C 디지털 교재',
  description: 'Python과 C를 처음 배우는 학생을 위한 실습형 디지털 교재',
  base: '/coding-textbook/',
  cleanUrls: false,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Python', link: '/python/01-hello-world' }
    ],
    sidebar: [
      {
        text: 'Python',
        items: [
          { text: '01. Hello World', link: '/python/01-hello-world' }
        ]
      }
    ]
  }
})
```

## 7. 단계별 작업

각 Step은 30분 이내에 끝나도록 나눈다.

### [x] Step 1. 폴더 생성

예상 시간: 5분

실행할 명령어:

```powershell
New-Item -ItemType Directory -Path docs/python -Force
New-Item -ItemType Directory -Path exercises/python/01-hello-world -Force
```

생성 대상:

- `docs/python/`
- `exercises/python/01-hello-world/`

### [x] Step 2. 단원 본문 파일 생성

예상 시간: 25분

만들 파일:

- `docs/python/01-hello-world.md`

실행할 명령어:

```powershell
New-Item -ItemType File -Path docs/python/01-hello-world.md -Force
```

작업 내용:

- 이 plan의 "단원 본문 전체 초안"을 그대로 파일에 넣는다.
- 단원 본문 안에 `Open in GitHub Codespaces` 배지를 포함한다.
- Codespaces 이동 경로는 `cd exercises/python/01-hello-world`로 명시한다.
- 모든 실습 문제에 파일명, 실행 명령어, 예상 출력을 붙인다.

### [x] Step 3. 스타터 파일 4개 생성

예상 시간: 20분

만들 파일:

- `exercises/python/01-hello-world/hello.py`
- `exercises/python/01-hello-world/greeting.py`
- `exercises/python/01-hello-world/badge.py`
- `exercises/python/01-hello-world/quotes.py`

실행할 명령어:

```powershell
New-Item -ItemType File -Path exercises/python/01-hello-world/hello.py -Force
New-Item -ItemType File -Path exercises/python/01-hello-world/greeting.py -Force
New-Item -ItemType File -Path exercises/python/01-hello-world/badge.py -Force
New-Item -ItemType File -Path exercises/python/01-hello-world/quotes.py -Force
```

작업 내용:

- 각 파일에 이 plan의 스타터 코드를 넣는다.
- 학생이 채울 부분은 `# TODO:` 주석으로 표시한다.
- starter 파일은 의도적으로 미완성 상태로 둔다.

### [x] Step 4. VitePress 사이드바 수정

예상 시간: 10분

수정 파일:

- `docs/.vitepress/config.ts`

작업 내용:

- `nav`에 Python 링크를 추가한다.
- `sidebar`에 `01. Hello World` 링크를 추가한다.
- `base: '/coding-textbook/'`는 그대로 둔다.

### [x] Step 5. 로컬 문서 빌드 검증

예상 시간: 10분

실행할 명령어:

```powershell
npm run docs:build
```

확인할 것:

- VitePress build가 성공한다.
- `docs/.vitepress/dist/python/01-hello-world.html` 또는 이에 대응하는 build output이 생성된다.
- Markdown code fence가 깨지지 않는다.

### [x] Step 6. 로컬 preview 확인

예상 시간: 10분

실행할 명령어:

```powershell
npm run docs:preview
```

확인할 URL:

```text
http://localhost:4173/coding-textbook/python/01-hello-world.html
```

확인할 것:

- 페이지 제목 `01 Hello World`가 보인다.
- Codespaces 배지가 보인다.
- sidebar에 `01. Hello World` 링크가 보인다.
- preview 확인 후 `Ctrl+C`로 서버를 종료한다.

### [x] Step 7. git 상태 확인

예상 시간: 5분

실행할 명령어:

```powershell
git status --short
```

확인할 것:

- 새 단원 파일과 exercises 파일 4개가 보인다.
- `docs/.vitepress/dist/`, `docs/.vitepress/.temp/`, `node_modules/`는 git에 올라가지 않는다.

## 8. 검증 기준

Day 2 구현 완료 기준:

- `npm run docs:build`가 로컬에서 성공한다.
- `/python/01-hello-world` 페이지가 정상 표시된다.
- sidebar에 `01. Hello World` 링크가 보인다.
- `exercises/python/01-hello-world/` 아래에 `.py` 파일 4개가 생성된다.
- `hello.py`, `greeting.py`, `badge.py`, `quotes.py`가 모두 starter code를 포함한다.
- Codespaces에서 `cd exercises/python/01-hello-world`로 이동할 수 있다.
- Codespaces에서 학생이 `hello.py`를 완성한 뒤 `python3 hello.py` 실행 시 아래 출력이 나온다.

```text
Hello, Python!
```

사용자가 직접 확인할 수 있는 URL:

```text
https://khye16.github.io/coding-textbook/python/01-hello-world.html
```

## 9. 저작권 체크

단원 작성 후 확인할 항목:

- 점프 투 파이썬, Real Python, Python 공식 문서, CS50 문장을 그대로 복사하지 않았는가?
- 개념은 참고하되 설명 문장은 이 프로젝트 학생 수준에 맞게 다시 썼는가?
- 코드 예시는 직접 작성했는가?
- 백준 문제 본문을 복사하지 않았는가?
- 백준은 링크만 사용했는가?
- 참고 자료 섹션에 출처 링크를 명시했는가?

본문에서 백준 관련 문구는 다음 원칙을 지킨다.

- 문제명과 링크만 제공한다.
- 문제 설명, 입력, 출력, 예제는 복사하지 않는다.
- `1000`, `1001`, `1008`은 `input()`이 필요하므로 이번 단원에서 제외한다고 명시한다.

## 10. 구현 전 최종 주의

- 이번 작업은 콘텐츠 작성이다. 기능 추가를 하지 않는다.
- 사이트 내 코드 실행기, 자동 채점, 진도 시스템을 추가하지 않는다.
- `sep`, `end`는 본문에 넣지 않는다.
- 자가진단은 정확히 3문제로 유지한다.
- 명령어 code fence에는 `powershell`만 사용한다.
- 임시 URL 표기를 남기지 않는다. Codespaces URL은 `https://codespaces.new/khye16/coding-textbook?quickstart=1`만 사용한다.
