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
한 줄 코드 안에서 여러 줄로 출력하거나 탭 간격을 만들고 싶을 때 이런 특수 문자가 필요합니다.  
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
