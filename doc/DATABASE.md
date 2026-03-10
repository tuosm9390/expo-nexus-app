Date: 2026-03-10 15:40:00
Author: Antigravity

# 💾 숨표(Sumpyo) AI - 데이터 설계 및 영속성 가이드

"오프라인에서도 안전하게, 온라인에서는 더 강력하게"

## 1. 개요 (Overview)

숨표 AI는 사용자의 프라이버시를 존중하며, 감성적인 처방전 데이터를 안전하게 보관하기 위해 **로컬 우선(Offline-First)** 및 **암호화 저장** 전략을 사용합니다.

## 2. 로컬 영속성 (Local Persistence)

사용자의 처방전 기록(History)은 기기 내부에 저장되며, 앱이 종료되어도 유지됩니다.

### 기술 스택

- **Storage Engine**: `expo-secure-store`
- **State Middleware**: Zustand `persist` middleware
- **Storage ID**: `sumpyo-prescription-storage`

### 데이터 스키마 (Prescription Object)

| 필드명      | 타입   | 설명                    |
| :---------- | :----- | :---------------------- |
| `id`        | string | 고유 식별자 (랜덤 생성) |
| `title`     | string | AI 처방전 제목          |
| `content`   | string | 상세 처방 내용          |
| `quote`     | string | 위로의 명언             |
| `style`     | string | 조제 스타일 (F/T/W)     |
| `createdAt` | string | 생성 일시 (ISO 8601)    |

## 3. 클라우드 데이터베이스 (Planned - Supabase)

향후 다중 기기 동기화 및 소셜 로그인 연동 시 Supabase(PostgreSQL)를 활용할 예정입니다.

### `prescriptions` 테이블 (TBD)

```sql
create table public.prescriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  title text not null,
  content text not null,
  quote text,
  style varchar(10),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### RLS (Row Level Security) 정책

- **Select**: `auth.uid() = user_id` (자신의 처방전만 조회 가능)
- **Insert**: `auth.uid() = user_id` (자신 명의로만 생성 가능)
- **Update/Delete**: `auth.uid() = user_id`

## 4. 보안 및 백업 (Security)

- **암호화**: `expo-secure-store`를 사용하여 저장된 데이터를 하드웨어 레벨에서 암호화합니다.
- **마이그레이션**: 게스트 모드(로컬)에서 회원 가입(클라우드) 전환 시, `usePrescriptionStore`의 데이터를 Supabase로 일괄 업로드하는 싱크 로직이 구현될 예정입니다.
