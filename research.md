# research.md

작성일: 2026-05-18 KST  
주제: Day 2 Python 첫 단원 `01-hello-world` 콘텐츠 리서치  
범위: `print()` 함수, 문자열, 따옴표, 줄바꿈, 한국어 출력, 초보자 오류, 예시/자가진단/미니 과제  
상태: Research 단계. 아직 plan이나 단원 본문은 만들지 않음.

## 0. AGENTS.md 재확인

이 프로젝트는 교육 콘텐츠 운영 프로젝트다. Day 2부터는 단원 콘텐츠가 본체이므로 기능 개발보다 학생이 실제로 막히지 않는 설명과 실습 지시가 중요하다.

단원 작성 시 반드시 지켜야 할 구조:

```markdown
# [번호] [제목]

## 이걸 왜 배우나
## 핵심 개념
## 예시 1 / 2 / 3
## 흔한 실수
## 자가진단
## 직접 풀어보기
## 참고 자료
```

학생 경험 원칙:

- 정확한 폴더 경로를 쓴다: `cd exercises/python/01-hello-world`
- 파일명을 직접 말한다: 예, `hello.py` 파일을 연다.
- 실행 명령어를 정확히 쓴다: `python3 hello.py`
- 예상 출력을 정확히 쓴다.
- "코드를 작성해 보세요" 같은 모호한 지시만 두지 않는다.

저작권 원칙:

- 외부 책/사이트 단락을 그대로 복사하지 않는다.
- 코드 예시는 직접 만든다.
- 백준 등 외부 문제는 링크만 둔다. 문제 본문은 복사하지 않는다.
- 단원 끝에는 참고 자료 출처를 명시한다.

## 1. 참고 자료와 활용 방식

이번 리서치는 지정 자료와 공식 문서를 함께 참고했다. 본문 작성 때는 문장을 복사하지 않고, 아래 자료에서 확인한 개념을 본 프로젝트 학생 수준에 맞게 다시 설명한다.

| 자료 | 확인한 내용 | 링크 |
|---|---|---|
| Python 공식 `print()` 문서 | 함수 시그니처, `sep`, `end`, `file`, `flush`, 기본 줄바꿈 | https://docs.python.org/3/library/functions.html#print |
| Python 공식 표현식 reference: Calls | 함수 호출 문법, callable, 인자 평가 | https://docs.python.org/3/reference/expressions.html#calls |
| Python 공식 tutorial 1장 | 문자열 표현, `\n`, `print()`가 escape 문자를 해석해 보이게 하는 방식 | https://docs.python.org/3/tutorial/introduction.html |
| Python 공식 `str` 문서 | 문자열은 Unicode code point sequence, 작은/큰/삼중 따옴표 | https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str |
| Python Unicode HOWTO | Python 3 `str`의 Unicode 성격, source 기본 UTF-8 | https://docs.python.org/3/howto/unicode.html |
| CS50 Python Lecture 0 | 첫 프로그램, 함수/인자 설명, missing parenthesis를 bug로 다루는 방식, `end='\n'` | https://cs50.harvard.edu/python/notes/0/ |
| Real Python print guide | `print()`를 실제 출력 제어 도구로 설명하는 방식, `sep`/`end` 응용 | https://realpython.com/python-print/ |
| 점프 투 파이썬: 사용자 입출력 | `print` 상세, 쉼표 출력, `sep`, `end` | https://wikidocs.net/25 |
| WikiDocs Python 표준 출력 | 따옴표 안 따옴표, escape, Unicode 문자열 설명 | https://wikidocs.net/20403 |
| Stack Overflow / Reddit 사례 | `print` 괄호 누락, `Print` 대문자, 따옴표 누락/미종료, 초보자의 실제 질문 패턴 | 예: https://stackoverflow.com/questions/25445439/what-does-syntaxerror-missing-parentheses-in-call-to-print-mean-in-python |
| Baekjoon 문제 링크 | 입문 출력 과제 매핑. 문제 본문은 복사하지 않음 | https://www.acmicpc.net/problem/2557 등 |

로컬 검증 메모:

- 현재 Windows 환경의 `python`/`python3`는 실제 Python interpreter가 아니라 Microsoft Store stub로 보인다.
- 따라서 에러 메시지 실행 검증은 로컬에서 완료하지 못했다.
- 아래 에러 문구는 Python 공식 문서, Stack Overflow/Reddit 사례, 현대 CPython에서 널리 보이는 문구를 기준으로 정리한다.
- Python minor version에 따라 caret 위치나 부가 제안 문구는 조금 달라질 수 있다. 단원 본문에서는 "핵심 문구"를 중심으로 설명한다.

## 2. 첫 단원에서 반드시 다룰 핵심 개념

### 2.1 `print()`는 "화면에 보여 달라"는 함수 호출이다

첫 단원에서 학생에게 가장 먼저 심어야 할 그림:

```python
print("Hello, Python!")
```

이 한 줄은 세 조각으로 나누어 설명한다.

| 조각 | 초보자용 설명 |
|---|---|
| `print` | Python이 이미 알고 있는 이름이다. 화면에 값을 보여 주는 일을 한다. |
| `(...)` | 함수를 실행시키는 표시다. 괄호 안에는 함수에게 건네줄 값을 넣는다. |
| `"Hello, Python!"` | 화면에 보여 줄 글자 데이터다. 이런 글자 데이터를 문자열이라고 부른다. |

공식 문서상 `print()`의 전체 형태는 다음 계열이다.

```python
print(*objects, sep=' ', end='\n', file=None, flush=False)
```

하지만 첫 단원에서 전부 가르치면 과하다. Day 2 첫 단원에서는 다음 정도만 노출한다.

1. `print("문장")`: 문자열 한 개 출력
2. `print("A")`, `print("B")`: 호출 한 번마다 기본적으로 줄이 바뀜
3. `print("A", "B")`: 쉼표로 여러 값을 넣으면 기본 공백으로 이어서 출력
4. `print("A", "B", sep="-")`: 살짝 응용용. 구분자를 바꿀 수 있다는 맛보기
5. `print("A", end="")`: 선택적 맛보기. 줄바꿈을 바꿀 수 있다는 정도

첫 단원에서 `file`, `flush`는 다루지 않는다. 필요성이 아직 없다.

### 2.2 괄호의 의미: "실행"과 "전달"

초보자는 괄호를 수학의 묶음 기호로만 알고 오는 경우가 많다. `print()`에서는 괄호가 함수 호출의 핵심이다.

가르칠 표현:

- `print`만 쓰면 "함수의 이름"을 말한 것이다.
- `print()`라고 써야 함수를 실행한다.
- 괄호 안에는 함수에게 줄 재료를 넣는다.
- `print("안녕")`은 `print`에게 문자열 `"안녕"`을 전달하고 실행한다는 뜻이다.

비유:

- `print` = 버튼 이름
- `()` = 버튼을 누르는 행동
- `"안녕"` = 버튼을 누르며 함께 넣는 종이 쪽지

주의:

- `print "안녕"`은 Python 3에서 안 된다.
- Python 2 시절의 오래된 예제를 복사하면 이 실수가 자주 나온다.

### 2.3 문자열: 따옴표로 감싼 글자 데이터

첫 단원에서 문자열은 "컴퓨터에게 이것은 명령어가 아니라 글자 그대로의 내용이라고 알려 주는 방법"으로 설명한다.

```python
print("안녕하세요")
print('안녕하세요')
```

작은따옴표와 큰따옴표는 첫 단계에서는 같은 역할로 봐도 된다.

선택 기준:

- 문장 안에 작은따옴표가 있으면 바깥은 큰따옴표를 쓴다.
- 문장 안에 큰따옴표가 있으면 바깥은 작은따옴표를 쓴다.
- 바깥 따옴표와 같은 따옴표를 안에 넣고 싶으면 `\"` 또는 `\'`처럼 escape를 쓴다.

예:

```python
print("I'm learning Python.")
print('그가 말했다: "안녕!"')
print("그가 말했다: \"안녕!\"")
```

초보자에게 중요한 포인트:

- 따옴표는 출력되는 글자의 일부가 아니다. 문자열의 시작과 끝을 표시한다.
- 따옴표를 열었으면 같은 종류의 따옴표로 닫아야 한다.
- `“ ”`, `‘ ’` 같은 스마트 따옴표는 Python 코드용 따옴표가 아니다. 웹페이지나 문서에서 복사했을 때 특히 조심한다.

### 2.4 한국어 출력과 인코딩

결론부터:

```python
print("안녕하세요")
```

Python 3와 GitHub Codespaces 기준에서는 특별한 설정 없이 정상 출력되는 것으로 가르쳐도 된다.

이유:

- Python 3의 `str`은 Unicode 문자를 담는다.
- Python source code의 기본 encoding은 UTF-8이다.
- Codespaces의 Linux terminal/VS Code 환경은 UTF-8을 기본으로 다루는 흐름이어서 한국어 출력이 자연스럽다.

초보자에게는 이렇게 설명한다.

> Python 3에서는 한국어도 문자열 안에 그냥 쓸 수 있다. 우리가 쓰는 Codespaces 환경에서는 `print("안녕하세요")`가 그대로 출력된다.

단, 교사용 메모:

- 고전 Windows 콘솔, 잘못 저장된 파일 encoding, 특수 emoji 출력에서는 encoding 문제가 날 수 있다.
- 한국어 자체는 Windows CP949에서도 대체로 표현 가능하지만, emoji나 일부 특수 기호는 `UnicodeEncodeError`가 날 수 있다.
- 첫 단원에서는 emoji를 필수 과제로 넣지 않는 편이 안전하다.
- 학생이 한국어가 깨진다고 하면 먼저 Codespaces에서 실행 중인지, 파일이 UTF-8로 저장되는지, 터미널이 VS Code terminal인지 확인한다.

### 2.5 줄바꿈 동작

`print()`는 기본적으로 출력 뒤에 줄바꿈을 붙인다.

```python
print("첫 줄")
print("둘째 줄")
```

예상 출력:

```text
첫 줄
둘째 줄
```

공식 문서의 핵심은 `end='\n'`이다. 초보자에게는 `\n`을 "줄을 바꾸라는 특수 표시"라고 말한다.

두 가지 줄바꿈을 구분해서 가르친다.

1. `print()` 호출이 끝날 때 자동으로 생기는 줄바꿈

```python
print("A")
print("B")
```

출력:

```text
A
B
```

2. 문자열 안에 직접 넣은 `\n`

```python
print("A\nB")
```

출력:

```text
A
B
```

첫 단원에서의 설명 순서:

1. 먼저 `print()`가 자동으로 줄을 바꾼다는 사실만 가르친다.
2. 그 다음 `\n`은 "문자열 안에서 줄바꿈을 넣는 표시"로 맛보기 한다.
3. `end=""`는 응용 예시 또는 자가진단에서만 살짝 쓴다.

### 2.6 따옴표 안의 따옴표 처리

이 단원에서 반드시 다뤄야 한다. 이유는 Hello World 다음 단계에서 학생이 곧바로 자기소개, 대사, 인용문을 출력하고 싶어 하기 때문이다.

가르칠 순서:

1. 바깥과 안쪽 따옴표를 다르게 쓴다.

```python
print('그가 말했다: "Python 좋아!"')
print("I'm ready.")
```

2. 같은 따옴표를 꼭 써야 하면 앞에 `\`를 붙인다.

```python
print("그가 말했다: \"Python 좋아!\"")
print('I\'m ready.')
```

3. ASCII art나 경로처럼 backslash 자체를 출력하려면 `\\`가 필요할 수 있다.

```python
print("\\")
```

출력:

```text
\
```

첫 단원에서는 raw string `r"..."`까지 설명하지 않는다. 단, 백준 10171/10172 같은 ASCII art 문제와 연결할 때 교사용 메모로 남긴다.

## 3. 초보자가 `print()`에서 자주 막히는 지점

### 3.1 Python 2 스타일로 쓰는 경우

잘못된 코드:

```python
print "Hello"
```

대표 에러:

```text
SyntaxError: Missing parentheses in call to 'print'. Did you mean print("Hello")?
```

근본 원인:

- Python 3에서는 `print`가 함수다.
- 함수는 괄호로 호출해야 한다.
- 오래된 Python 2 예제나 낡은 블로그를 보고 따라 하면 발생한다.

해결:

```python
print("Hello")
```

가르칠 문장:

> Python 3에서는 `print` 뒤에 반드시 괄호를 붙인다.

### 3.2 `Print`처럼 대문자로 시작하는 경우

잘못된 코드:

```python
Print("Hello")
```

대표 에러:

```text
NameError: name 'Print' is not defined
```

Python 버전에 따라 다음처럼 제안이 붙을 수 있다.

```text
NameError: name 'Print' is not defined. Did you mean: 'print'?
```

근본 원인:

- Python은 대소문자를 구분한다.
- `print`와 `Print`는 다른 이름이다.
- Python이 알고 있는 내장 함수 이름은 소문자 `print`다.

해결:

```python
print("Hello")
```

가르칠 문장:

> Python에서는 대문자와 소문자가 다르다. 첫 단원에서는 `print`를 전부 소문자로 쓴다.

### 3.3 문자열에 따옴표를 안 붙이는 경우

잘못된 코드:

```python
print(Hello)
```

대표 에러:

```text
NameError: name 'Hello' is not defined
```

근본 원인:

- 따옴표 없는 `Hello`는 글자가 아니라 "이름"으로 해석된다.
- 아직 `Hello`라는 변수나 이름을 만든 적이 없으므로 Python이 찾지 못한다.

해결:

```python
print("Hello")
```

가르칠 문장:

> 글자 그대로 출력하고 싶으면 따옴표로 감싼다.

### 3.4 여는 따옴표만 쓰고 닫지 않는 경우

잘못된 코드:

```python
print("Hello)
```

대표 에러:

```text
SyntaxError: unterminated string literal (detected at line 1)
```

근본 원인:

- Python은 `"`를 보고 문자열이 시작됐다고 생각한다.
- 줄 끝까지 읽었는데 닫는 `"`를 찾지 못했다.

해결:

```python
print("Hello")
```

가르칠 문장:

> 따옴표는 여는 것과 닫는 것이 한 쌍이다.

### 3.5 괄호를 닫지 않는 경우

잘못된 코드:

```python
print("Hello"
```

대표 에러:

```text
SyntaxError: '(' was never closed
```

Python 버전이나 실행 위치에 따라 `invalid syntax` 계열로 보일 수도 있다.

근본 원인:

- `print(`로 함수 호출을 시작했지만 닫는 `)`가 없다.

해결:

```python
print("Hello")
```

가르칠 문장:

> 괄호도 따옴표처럼 열었으면 닫아야 한다.

### 3.6 바깥 따옴표와 안쪽 따옴표가 충돌하는 경우

잘못된 코드:

```python
print("그가 말했다: "안녕!"")
```

대표 에러:

```text
SyntaxError: invalid syntax. Perhaps you forgot a comma?
```

또는 caret가 안쪽 따옴표 부근을 가리키는 `SyntaxError`가 난다.

근본 원인:

- Python은 두 번째 `"`를 문자열 끝으로 오해한다.
- 그 뒤의 `안녕!`은 Python 코드로 해석하려다 실패한다.

해결 1: 바깥과 안쪽 따옴표를 다르게 쓴다.

```python
print('그가 말했다: "안녕!"')
```

해결 2: 안쪽 따옴표 앞에 `\`를 붙인다.

```python
print("그가 말했다: \"안녕!\"")
```

가르칠 문장:

> 문장 안에 따옴표를 넣고 싶으면 바깥 따옴표와 다른 종류를 쓰는 것이 가장 쉽다.

### 3.7 스마트 따옴표를 붙여 넣는 경우

잘못된 코드:

```python
print(“Hello”)
```

대표 에러:

```text
SyntaxError: invalid character '“' (U+201C)
```

근본 원인:

- `“`와 `”`는 문서 편집기용 예쁜 따옴표다.
- Python 문자열을 여닫는 문자는 ASCII 작은따옴표 `'` 또는 큰따옴표 `"`다.

해결:

```python
print("Hello")
```

가르칠 문장:

> 코드에서는 곧은 따옴표를 쓴다. 블로그나 문서에서 복사한 따옴표가 다르게 생겼으면 직접 다시 입력한다.

### 3.8 backslash가 escape로 해석되는 경우

잘못 이해하기 쉬운 코드:

```python
print("A\nB")
```

출력:

```text
A
B
```

근본 원인:

- `\n`은 두 글자처럼 보이지만 문자열 안에서는 줄바꿈 표시로 해석된다.
- ASCII art에서 `\`를 출력하려면 `\\`가 필요할 수 있다.

해결:

```python
print("A\\nB")
```

출력:

```text
A\nB
```

가르칠 문장:

> `\`는 문자열 안에서 특별한 표시를 만들 때 쓰인다. `\` 자체를 보이고 싶으면 두 번 쓴다.

### 3.9 `sep` 또는 `end`에 문자열이 아닌 값을 넣는 경우

잘못된 코드:

```python
print("A", "B", sep=0)
```

대표 에러:

```text
TypeError: sep must be None or a string, not int
```

잘못된 코드:

```python
print("A", end=0)
```

대표 에러:

```text
TypeError: end must be None or a string, not int
```

근본 원인:

- 공식 문서 기준 `sep`와 `end`는 문자열 또는 `None`이어야 한다.
- `0`은 문자열 `"0"`이 아니라 정수 `0`이다.

해결:

```python
print("A", "B", sep="0")
print("A", end="0")
```

첫 단원에서는 필수 실수로 다루기보다 응용 예시에서 `sep`/`end`를 쓸 때만 짧게 언급한다.

## 4. 첫 단원에 적합한 예시 코드 패턴 3개

아래 예시는 외부 자료의 코드를 베끼지 않고, 이 프로젝트 단원용으로 직접 구성한 패턴이다.

### 예시 1: 가장 단순한 첫 코드

파일 후보: `hello.py`

```python
print("Hello, Python!")
```

예상 출력:

```text
Hello, Python!
```

가르칠 포인트:

- `print`
- 괄호
- 문자열
- 실행하면 터미널에 결과가 나온다는 경험

주의:

- 너무 오래 설명하지 않는다.
- 학생이 직접 실행해서 "내가 방금 프로그램을 실행했다"는 감각을 얻는 것이 핵심이다.

### 예시 2: 살짝 응용 - 여러 줄 자기소개

파일 후보: `greeting.py`

```python
print("안녕하세요.")
print("저는 Python을 배우기 시작했습니다.")
print("오늘의 목표는 print()에 익숙해지는 것입니다.")
```

예상 출력:

```text
안녕하세요.
저는 Python을 배우기 시작했습니다.
오늘의 목표는 print()에 익숙해지는 것입니다.
```

가르칠 포인트:

- 한국어 문자열 출력
- `print()` 한 번마다 줄이 바뀜
- 파일 안에 여러 줄의 코드가 위에서 아래로 실행됨

주의:

- 변수, 입력, 조건문은 아직 넣지 않는다.
- "자기 이름을 직접 넣어 보라" 정도는 가능하지만 `input()`은 다음 단원으로 미룬다.

### 예시 3: 조금 더 흥미로운 응용 - 콘솔 명찰 만들기

파일 후보: `badge.py`

```python
print("=" * 24)
print("나의 첫 Python 명찰")
print("-" * 24)
print("이름:", "홍길동")
print("오늘 배운 것:", "print()")
print("=" * 24)
```

예상 출력:

```text
========================
나의 첫 Python 명찰
------------------------
이름: 홍길동
오늘 배운 것: print()
========================
```

가르칠 포인트:

- `print("이름:", "홍길동")`처럼 쉼표로 여러 값을 출력하면 사이에 공백이 들어감
- 문자열에 `* 숫자`를 붙이면 반복 출력할 수 있음
- 학생이 "터미널에도 모양을 만들 수 있네"라고 느끼기 좋음

주의:

- `*` 연산은 본격 설명하지 않아도 된다.
- "문자열을 여러 번 반복하는 짧은 마법" 정도로 소개하고, 자세한 연산은 뒤 단원으로 미룬다.

## 5. 자가진단 문제로 적합한 유형

### 5.1 출력 예측 문제

목적:

- 코드가 위에서 아래로 실행된다는 감각
- `print()` 호출마다 줄바꿈이 생긴다는 감각
- 쉼표 출력의 기본 공백

문제 예시:

```python
print("Python")
print("C")
```

질문:

- 화면에는 몇 줄이 출력되는가?
- 첫 줄과 둘째 줄에는 각각 무엇이 보이는가?

문제 예시:

```python
print("Python", "C")
```

질문:

- 출력이 한 줄인가, 두 줄인가?
- 두 단어 사이에 무엇이 들어가는가?

문제 예시:

```python
print("A\nB")
```

질문:

- 출력은 실제로 몇 줄인가?
- `\n`은 화면에 그대로 보이는가, 줄바꿈으로 바뀌는가?

### 5.2 에러 찾기 문제

목적:

- 에러 메시지를 무서운 문장이 아니라 힌트로 읽게 만들기
- `NameError`와 `SyntaxError`의 차이를 첫 감각으로 잡기

문제 예시:

```python
Print("Hello")
```

정답 방향:

- `Print`가 아니라 `print`.
- Python은 대소문자를 구분한다.

문제 예시:

```python
print(Hello)
```

정답 방향:

- 글자 그대로 출력하려면 `"Hello"`처럼 따옴표가 필요하다.

문제 예시:

```python
print("안녕하세요)
```

정답 방향:

- 문자열을 닫는 큰따옴표가 없다.

문제 예시:

```python
print("그가 말했다: "좋아!"")
```

정답 방향:

- 안쪽 큰따옴표가 바깥 문자열을 끊어 버린다.
- 바깥을 작은따옴표로 바꾸거나 안쪽 큰따옴표를 escape한다.

### 5.3 빈칸 채우기 문제

목적:

- 학생이 직접 문법 조각을 채워 넣으며 구조를 기억하게 하기

문제 예시:

```python
____("Hello, Python!")
```

정답:

```python
print("Hello, Python!")
```

문제 예시:

```python
print(____)
```

요구:

- `안녕하세요`가 출력되도록 빈칸 채우기

정답:

```python
print("안녕하세요")
```

문제 예시:

```python
print("Python", "C", sep=____)
```

요구:

- `Python -> C`가 출력되도록 빈칸 채우기

정답:

```python
print("Python", "C", sep=" -> ")
```

### 5.4 고르면 좋은 자가진단 구성

첫 단원 끝에는 다음 조합이 좋다.

1. 출력 예측 1문제: 여러 `print()` 줄
2. 출력 예측 1문제: 쉼표 출력
3. 에러 찾기 1문제: `Print` 또는 따옴표 누락
4. 빈칸 채우기 1문제: `print("...")`
5. 선택 문제 1개: `sep` 또는 `\n`

최소 3문제 이상이라는 AGENTS.md 기준을 만족하되, 첫 단원이라 4~5문제가 적당하다.

## 6. 학습 산출물과 미니 과제

### 6.1 이 단원의 핵심 산출물

학생이 Day 2 첫 단원 끝에서 만들 수 있어야 하는 파일:

```text
exercises/python/01-hello-world/
├── hello.py
├── greeting.py
└── badge.py
```

단원 본문에는 정확히 다음 식으로 안내해야 한다.

```bash
cd exercises/python/01-hello-world
python3 hello.py
python3 greeting.py
python3 badge.py
```

각 파일별 산출물:

| 파일 | 목표 | 핵심 개념 |
|---|---|---|
| `hello.py` | 한 줄 출력 | `print("문자열")` |
| `greeting.py` | 한국어 여러 줄 출력 | 여러 `print()` 호출과 줄바꿈 |
| `badge.py` | 콘솔 명찰 출력 | 쉼표 출력, 문자열 반복, 간단한 모양 |

### 6.2 Hello World 변형 미니 과제 후보

미니 과제 1: 첫 문장 출력

- 파일명: `hello.py`
- 요구: `Hello, Python!`을 정확히 출력한다.
- 실행: `python3 hello.py`
- 예상 출력:

```text
Hello, Python!
```

미니 과제 2: 한국어 인사 3줄

- 파일명: `greeting.py`
- 요구: 한국어 문장 3줄을 각각 다른 `print()`로 출력한다.
- 실행: `python3 greeting.py`
- 예상 출력 예시:

```text
안녕하세요.
저는 Python을 배우고 있습니다.
오늘은 print()를 배웠습니다.
```

미니 과제 3: 따옴표 출력

- 파일명: `quotes.py`
- 요구: 큰따옴표가 포함된 문장과 작은따옴표가 포함된 문장을 각각 출력한다.
- 실행: `python3 quotes.py`
- 예상 출력 예시:

```text
그가 말했다: "좋아!"
I'm learning Python.
```

미니 과제 4: 명찰 만들기

- 파일명: `badge.py`
- 요구: 위아래 선과 이름/오늘 배운 것을 출력한다.
- 실행: `python3 badge.py`
- 예상 출력 예시:

```text
========================
나의 첫 Python 명찰
------------------------
이름: 홍길동
오늘 배운 것: print()
========================
```

### 6.3 백준 1000번대 입문 문제와의 매핑

저작권 규칙상 문제 본문은 복사하지 않는다. 단원에는 링크와 "왜 연결되는지"만 적는다.

현재 확인 메모:

- 2026-05-18 조회 기준, 일부 BOJ 페이지는 서비스 준비/종료 안내 화면으로 보일 수 있다.
- 따라서 단원에서는 백준을 필수 과제로 묶지 말고 "추가 연습 링크" 정도로 둔다.
- 학생이 접속했을 때 페이지가 열리지 않으면 내부 미니 과제로 대체한다.

| 문제 | 링크 | 이 단원과의 연결 | 첫 단원 적합도 |
|---|---|---|---|
| 2557 Hello World | https://www.acmicpc.net/problem/2557 | 단순 문자열 1줄 출력 | 매우 적합. 단, 1000번대는 아님 |
| 10171 고양이 | https://www.acmicpc.net/problem/10171 | 여러 줄 출력, backslash escape | 적합하지만 escape 난도가 있음 |
| 10172 개 | https://www.acmicpc.net/problem/10172 | 따옴표와 backslash가 섞인 ASCII art | 흥미롭지만 초보자에게 꽤 어려움 |
| 1000 A+B | https://www.acmicpc.net/problem/1000 | 출력은 `print()`지만 입력/정수 변환이 필요 | 다음 단원 이후 권장 |
| 1001 A-B | https://www.acmicpc.net/problem/1001 | 입력/정수 변환/연산/출력 | 다음 단원 이후 권장 |
| 1008 A/B | https://www.acmicpc.net/problem/1008 | 입력/실수 또는 나눗셈 개념 필요 | 출력 단원만으로는 이름 |

첫 단원 추천:

1. 필수 산출물은 내부 미니 과제로 한다.
2. 백준은 참고 링크로만 둔다.
3. 2557은 "외부 사이트에서 가장 단순한 출력 문제"로 소개 가능하다.
4. 10171/10172는 "따옴표와 backslash에 익숙해진 뒤 도전"으로 소개한다.
5. 1000/1001/1008은 입력과 숫자 변환을 배운 뒤로 미룬다.

## 7. 단원 본문 작성 시 권장 흐름

### 7.1 도입

핵심 메시지:

- 프로그래밍을 처음 배울 때 첫 경험은 "내가 쓴 글자가 컴퓨터 화면에 나온다"이다.
- `print()`는 앞으로 디버깅, 결과 확인, 문제 풀이에서 계속 쓰인다.

도입 문장 방향:

> 오늘은 Python에게 "이 문장을 화면에 보여 줘"라고 말하는 법을 배운다. 가장 작은 프로그램이지만, 앞으로 모든 실습의 출발점이다.

### 7.2 핵심 개념 순서

권장 순서:

1. `print("Hello, Python!")` 실행
2. `print`, 괄호, 문자열을 세 조각으로 분해
3. 작은따옴표/큰따옴표
4. 여러 `print()`와 자동 줄바꿈
5. 한국어 출력
6. 따옴표 안 따옴표
7. 흔한 에러 읽기

피해야 할 것:

- 처음부터 `file`, `flush`, buffering 설명
- 처음부터 f-string, 변수, `input()`
- Unicode code point를 깊게 설명
- Python 2와 Python 3 역사 설명을 길게 하는 것

### 7.3 설명 톤

학생은 완전 입문자이므로 전문 용어를 다음처럼 풀어 쓴다.

| 용어 | 첫 단원 설명 |
|---|---|
| 함수 | Python이 이미 알고 있는 작은 기능 |
| 호출 | 함수를 실행하는 것 |
| 인자 | 함수에게 건네주는 값 |
| 문자열 | 따옴표로 감싼 글자 데이터 |
| 에러 | Python이 어디서 헷갈렸는지 알려 주는 메시지 |
| SyntaxError | 문법 모양이 맞지 않는다는 뜻 |
| NameError | Python이 그런 이름을 모른다는 뜻 |

## 8. 첫 단원에서 다루지 말아야 할 것

다음은 첫 단원에서 빼는 편이 좋다.

- `input()`: 다음 단원 또는 변수 단원에서 다룬다.
- 숫자 연산: 아주 짧은 맛보기 외에는 뒤로 미룬다.
- f-string: 변수 전 설명이 필요하므로 뒤로 미룬다.
- triple quote: 여러 줄 문자열보다 여러 `print()`가 먼저다.
- raw string: backslash 문제가 실제로 나온 뒤 짧게 다룬다.
- `file`, `flush`: 첫 단원에는 필요 없다.
- encoding 선언 `# -*- coding: utf-8 -*-`: Python 3 기본 UTF-8 설명으로 충분하다.
- 백준 문제 본문 복사: 링크만 둔다.

## 9. 단원에 들어갈 참고 자료 후보

단원 끝 참고 자료에는 아래 정도만 넣는 것이 적당하다.

- Python 공식 문서: `print()`  
  https://docs.python.org/3/library/functions.html#print
- Python 공식 tutorial: 문자열 기초  
  https://docs.python.org/3/tutorial/introduction.html
- CS50 Python Lecture 0: Functions, Variables  
  https://cs50.harvard.edu/python/notes/0/
- 점프 투 파이썬: 사용자 입출력  
  https://wikidocs.net/25

Real Python은 내용이 길고 고급 옵션까지 많으므로, 단원 본문 참고 자료에는 선택적으로만 넣는다.

## 10. 결론

Python 첫 단원은 `print()`의 전체 기능을 설명하는 단원이 아니라, 학생이 "코드를 쓰고 실행해서 출력 결과를 확인하는 첫 성공"을 얻는 단원이어야 한다.

필수 개념:

- `print()`는 함수 호출이다.
- 괄호 안에 출력할 값을 넣는다.
- 글자는 따옴표로 감싼다.
- Python 3/Codespaces에서는 한국어 문자열을 그대로 출력할 수 있다.
- `print()`는 기본적으로 줄바꿈을 붙인다.
- 따옴표 안 따옴표는 다른 따옴표를 쓰거나 escape한다.

필수 실수:

- 괄호 누락
- 대소문자 오류
- 따옴표 누락
- 따옴표 미종료
- 괄호 미종료
- 내부 따옴표 충돌
- 스마트 따옴표
- backslash escape

권장 산출물:

- `hello.py`: 한 줄 출력
- `greeting.py`: 한국어 여러 줄 출력
- `badge.py`: 콘솔 명찰 출력

